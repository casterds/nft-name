import { Link, Outlet } from "react-router-dom"
export default function Layout() {
    return <div>
        <div className="flex justify-between px-4 py-4 bg-slate-300">
            <Link className="first" to={"/"}>
                ICON
            </Link>
            <Link className="second" to={"/"}>
                BROWSE
            </Link>
            <div className="end">
                CONNECT
            </div>
        </div>
        <div className="bg-slate-200 p-40">
            <Outlet />
        </div>
        <div className="text-center bg-slate-400">
            <div className="p-2 text-lg font-bold">© 2023 NFTR</div>
            <div className="flex justify-center gap-20 flex-wrap  p-8">
                <div>HOME</div>
                <div>DOCS</div>
                <div>TOKEN</div>
                <div>COMMUNITY</div>
                <div>BLOG</div>
                <div>NEWS</div>
            </div>
        </div>
    </div>
}
