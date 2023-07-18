'use server'

export async function addUser(data: any) {
    const { name, message } = Object.fromEntries(data);

    return { name, message };
}

export async function getUser(data: unknown) {

}