import Link from "next/link";

export default function MobileTweet() {

    return (
        <>
            <Link href={'/tweet'}>
                <div className="w-full fixed bottom-4 rounded-md px-3">
                    <div className="bg-slate-100 text-gray-800 p-3 rounded-md text-center font-medium">
                        Tweet
                    </div>
                </div>
            </Link>
        </>
    )
}
