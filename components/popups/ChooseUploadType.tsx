import 'twin.macro';
import Image from 'next/image';
import SocialPostIcon from 'public/assets/svgs/social_post_icon.svg';
import CompleteWorkIcon from 'public/assets/svgs/complete_work_icon.svg';
import Link from 'next/link';

function Panel(props: {
  src: StaticImageData;
  alt: string;
  message: string;
  label: string;
  href: string;
}) {
  return (
    <div tw="flex-auto flex flex-col w-1 p-5 sm:m-3 sm:p-7 md:mx-5 md:p-10 lg:mx-8 lg:p-12 gap-10 bg-gray-50 rounded-lg">
      <div tw="flex justify-center">
        <Image src={props.src} alt={props.alt} />
      </div>
      <div tw="text-gray-400 text-lg">{props.message}</div>
      <Link href={props.href} passHref>
        <div tw="px-6 py-2.5 bg-theme-red hover:bg-[#be4040] text-white font-bold cursor-pointer rounded-full mx-auto">
          {props.label}
        </div>
      </Link>
    </div>
  );
}

function ChooseUploadType() {
  return (
    <div tw="flex flex-row w-full px-2 gap-3">
      <Panel
        src={SocialPostIcon}
        alt="Social Post Icon"
        message="Engage your audience with social posts: anything from a video of your new studio or photos of a work in progress!"
        label="Posts"
        href="/upload_social_post"
      />
      <Panel
        src={CompleteWorkIcon}
        alt="Complete Work Icon"
        message="Display your completed works in your portfolio and list them on the marketplace!"
        label="Works"
        href="/upload_complete_work"
      />
    </div>
  );
}

export default ChooseUploadType;
