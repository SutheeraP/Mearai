import React from 'react'
import { api } from "~/trpc/server";

export default async function Post() {
    const data = await api.post.hello({ name: "Dominic Toresto Miami Today" });

    return (
        <div className='p-4'>Post {data}</div>
    )
}
