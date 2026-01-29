import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret-key-change-this");

const cookie = {
    name: "session",
    options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
    },
    duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: Record<string, unknown>) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function createSession(userId: string) {
    const expires = new Date(Date.now() + cookie.duration);
    const session = await encrypt({ userId, expires });

    (await cookies()).set(cookie.name, session, { ...cookie.options, expires });
}

export async function verifySession() {
    const cookieStore = await cookies();
    const session = cookieStore.get(cookie.name)?.value;
    const sessionPayload = await decrypt(session);

    if (!sessionPayload?.userId) {
        redirect("/admin/login");
    }

    return { userId: sessionPayload.userId };
}

export async function deleteSession() {
    (await cookies()).delete(cookie.name);
    redirect("/admin/login");
}
