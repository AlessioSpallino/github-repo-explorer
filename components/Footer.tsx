'use client';
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="flex gap-6 flex-wrap items-center justify-center py-4 text-white">
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4 font-[family-name:var(--font-geist-mono)]"
                href="https://www.linkedin.com/in/alessio-spallino/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    aria-hidden
                    src="/globe.svg"
                    alt="Globe icon"
                    width={16}
                    height={16}
                />
                Go to Alessio Spallino's LinkedIn profile →
            </a>
        </footer>
    );
};

export default Footer;
