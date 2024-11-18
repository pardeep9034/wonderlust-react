export default function Footer() {
    return (
        <footer className="bg-slate-800 text-white py-6">
            <div className="container mx-auto flex flex-col items-center justify-center text-center space-y-4">
                <h1 className="text-2xl font-bold">Wonderlust</h1>
                <p className="text-sm">&copy; {new Date().getFullYear()} Wonderlust. All rights reserved.</p>
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-blue-400">
                        <i className="fab fa-facebook-f text-xl"></i>
                    </a>
                    <a href="#" className="hover:text-pink-400">
                        <i className="fab fa-instagram text-xl"></i>
                    </a>
                    <a href="#" className="hover:text-blue-300">
                        <i className="fab fa-twitter text-xl"></i>
                    </a>
                    <a href="#" className="hover:text-red-500">
                        <i className="fab fa-youtube text-xl"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}
