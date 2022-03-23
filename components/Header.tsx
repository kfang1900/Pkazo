import Link from 'next/link';
import Image from 'next/image';
import Logo from '/public/assets/images/Pkazo.svg';
import HouseLogo from '/public/assets/images/house.svg';
import ShopLogo from '/public/assets/images/shop.svg';
import PlusLogo from '/public/assets/images/plus.svg';
import MessageLogo from '/public/assets/images/message.svg';
import CompassLogo from '/public/assets/images/compass.svg';
import CartLogo from '/public/assets/images/cart.svg';
import ProfileImg from '/public/assets/images/profile.png';
import tw from 'twin.macro';
import { UrlObject } from 'url';

/* Copied from image.tsx source */
interface StaticRequire {
  default: StaticImageData;
}
type StaticImport = StaticRequire | StaticImageData;

function NavbarIcon(props: {
  href: string | UrlObject;
  src: string | StaticImport;
  alt: string;
}) {
  return (
    <div tw="flex flex-none transform w-8">
      <Link href={props.href} passHref>
        <Image
          src={props.src}
          alt={props.alt}
          layout="fill"
          tw="scale-75 cursor-pointer hover:scale-90 ease-in-out duration-200"
        />
      </Link>
    </div>
  );
}

const Header = () => {
  return (
    <div tw="w-full">
      <div tw="px-5 flex flex-row items-center justify-between py-3">
        <div tw="flex flex-auto items-center gap-10 w-36">
          <div tw="flex-none cursor-pointer -mr-5">
            <Link href="/" passHref>
              <Image src={Logo} tw="w-28" alt="Pkazo" />
            </Link>
          </div>

          <div>
            <input
              type="text"
              placeholder="Search"
              tw="px-4 py-2 bg-gray-100 outline-none rounded-full w-48"
            />
          </div>
        </div>

        <div tw="flex flex-auto flex-row justify-center h-8 gap-7">
          <NavbarIcon href="/" src={HouseLogo} alt="House Logo" />
          <NavbarIcon href="/" src={ShopLogo} alt="Shop Logo" />
          <NavbarIcon href="/" src={CompassLogo} alt="Compass Logo" />
          <NavbarIcon href="/" src={PlusLogo} alt="Plus Logo" />
          <NavbarIcon href="/" src={MessageLogo} alt="Message Logo" />
        </div>

        <div tw="flex flex-auto flex-row-reverse w-36 justify-start h-8 gap-3">
          <NavbarIcon href="/" src={CartLogo} alt="Cart Logo" />
          <NavbarIcon href="/" src={PlusLogo} alt="Plus Logo" />
          <NavbarIcon href="/" src={ProfileImg} alt="Profile Picture" />
        </div>
      </div>
    </div>
  );
};

export default Header;
