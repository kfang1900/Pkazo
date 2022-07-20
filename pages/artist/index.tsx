import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

const ShopManager = () => {
    const mediaQuery = !useMediaQuery({ query: `(min-width: 768px)` });
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        if (isMobile !== mediaQuery) setIsMobile(mediaQuery);
    }, [mediaQuery, isMobile]);

    const router = useRouter();
    // if (!isMobile) router.push('/artist/collections');
    return <div>mobile shop manager menu</div>
}

export default ShopManager;