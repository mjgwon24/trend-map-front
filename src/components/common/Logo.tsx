import Image from 'next/image';

interface LogoProps {
    showText?: boolean;
    size?: 'sm' | 'md' | 'lg';
    textColor?: 'primary' | 'secondary' | 'white' | 'black';
    fontWeight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
}

export default function Logo({
                                 showText = true,
                                 size = 'md',
                                 textColor = 'primary',
                                 fontWeight = 'normal'
                             }: LogoProps) {
    const dimensions = {
        sm: { width: 24, height: 24, textSize: 'text-sm' },
        md: { width: 32, height: 32, textSize: 'text-lg' },
        lg: { width: 48, height: 48, textSize: 'text-2xl' },
    };

    const weightClasses = {
        thin: 'font-thin',
        extralight: 'font-extralight',
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
        black: 'font-black'
    };

    const colorClasses = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        white: 'text-white',
        black: 'text-black'
    };

    const { width, height, textSize } = dimensions[size];

    return (
        <div className="flex items-center">
            <Image
                src="/logo/trend-map-logo-pink.svg"
                alt="Trend Map"
                width={width}
                height={height}
                className="flex-shrink-0"
            />
            {showText && (
                <div className="ml-2 overflow-hidden whitespace-nowrap">
                    <h1 className={`${textSize} font-logo ${colorClasses[textColor]} ${weightClasses[fontWeight]}`}>
                        Trend Map
                    </h1>
                </div>
            )}
        </div>
    );
}