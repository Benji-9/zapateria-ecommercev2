export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Zapateria Boston</h3>
                        <p className="text-sm text-gray-400">
                            Calidad y tradición desde 1925.
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                            Colon 302, Tres Arroyos<br />
                            Provincia de Buenos Aires
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
