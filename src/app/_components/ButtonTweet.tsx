import Link from "next/link";

export default function ButtonTweet() {

    return (
        <>
            <Link href={'/tweet'}>
                <div className="w-full flex justify-end fixed bottom-4 rounded-md px-3">
                    <div className="bg-slate-100 text-gray-800 h-16 w-16 text-2xl leading-tight flex justify-center items-center rounded-full">
                        +
                    </div>
                </div>
            </Link>
        </>
    )
}
