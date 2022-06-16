import React, { useCallback, useEffect, useState } from 'react';
import tw from 'twin.macro';
import Image from 'next/image';

export default function EditProfilePage() {

    const styles = {
        label: tw`text-[16px] text-[#8B8B8B] text-right mt-[10px]`,
        input: tw`border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-full h-[40px]`,
    };
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    // change this later
    const portfolios = [
        '/assets/images/kevin_fang.jpg',
        '/assets/images/kevin_fang.jpg',
        '/assets/images/kevin_fang.jpg',
        '/assets/images/kevin_fang.jpg'
    ]
    return (
        <div tw='w-full'>
            {/* portfolio circles */}
            <div
                tw='mx-auto flex items-center justify-between mt-[60px]'
                style={{ maxWidth: `${180 * Math.max(5, portfolios.length + 1) - 52}px` }}
            >
                {portfolios.map((portfolio, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                    >
                        <div
                            css={[
                                tw`relative rounded-full overflow-hidden origin-bottom border-transparent`,
                                activeIndex === i && tw`border-[#C6C5C3]`,
                                tw`w-[128px] h-[128px] border-[6px]`
                            ]}
                        >
                            <Image
                                src={portfolio}
                                alt='portfolio image'
                                layout='fill'
                                objectFit='cover'
                            />
                        </div>
                    </button>
                ))}
                {portfolios.length < 5 &&
                    <button
                        tw='w-[116px] h-[116px] bg-[#F3F3F3] hover:bg-[#E8E8E8] rounded-full flex items-center justify-center'
                    >
                        <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="15.9736" y="0.656006" width="5.77619" height="36.6864" rx="2.8881" fill="#C4C4C4" />
                            <rect x="0.811523" y="22.2336" width="5.86982" height="36.1012" rx="2.93491" transform="rotate(-90 0.811523 22.2336)" fill="#C4C4C4" />
                        </svg>
                    </button>
                }
            </div>

        </div>
        // <div tw="ml-[76px] mt-9 mb-[100px]">
        //     {!data && <p>Loading...</p>}
        //     {data && (
        //         <>
        //             <div tw="flex">
        //                 <div tw="w-[132px] h-[132px] relative">
        //                     <div tw="overflow-hidden rounded-full flex items-center ">
        //                         {data.profilePictureURL ? (
        //                             <Image
        //                                 src={data.profilePictureURL}
        //                                 alt="profile_image"
        //                                 width="132px"
        //                                 height="132px"
        //                                 objectFit="cover"
        //                             />
        //                         ) : (
        //                             <div tw={'bg-gray-200 w-[132px] h-[132px]'} />
        //                         )}
        //                     </div>
        //                     <ImageUploadButton
        //                         offset={0}
        //                         uploadLocation={'Artists/VWOgAFjhL0BlFlbDTJZF/Profile_Photo'}
        //                         onError={(error) => {
        //                             console.log(error);
        //                         }}
        //                         onUploadComplete={async (uploadRef) => {
        //                             const app = getApp();
        //                             const db = getFirestore(app);
        //                             const gsURL = uploadRef.toString();

        //                             await updateDoc(doc(db, 'artists', artistId), {
        //                                 profilePicture: gsURL,
        //                             } as Partial<ArtistData>);

        //                             const pfpURL = await loadStorageImage(gsURL);

        //                             setData((oldData) => {
        //                                 return Object.assign({}, oldData, {
        //                                     profilePictureURL: pfpURL,
        //                                 });
        //                             });
        //                         }}
        //                     />
        //                 </div>
        //                 <div tw="ml-9 flex flex-col justify-center">
        //                     <div tw="text-black text-[28px] font-semibold">{data.name}</div>
        //                     <div tw="text-[#8B8B8B] text-[20px] font-semibold mt-[10px]">
        //                         {data.location}
        //                         &nbsp;&nbsp;•&nbsp;&nbsp;{data.discipline}
        //                     </div>
        //                 </div>
        //             </div>
        //             <div tw="font-semibold mt-12 text-[20px]">Basic Information</div>
        //             <Formik
        //                 initialValues={{
        //                     name: data.name,
        //                     discipline: data.discipline,
        //                     location: data.location,
        //                     bio: data.bio,
        //                 }}
        //                 onSubmit={async (values) => {
        //                     const app = getApp();
        //                     const db = getFirestore(app);
        //                     await updateDoc(doc(db, 'artists', artistId), {
        //                         name: values.name,
        //                         discipline: values.discipline,
        //                         location: values.location,
        //                         bio: values.bio,
        //                         numPosts: 0,
        //                         numWorks: 3, //TODO make this do something better
        //                     } as Partial<ArtistData>);
        //                     setData((oldData) => {
        //                         return Object.assign({}, oldData, values);
        //                     });
        //                     console.log('updated');
        //                 }}
        //             >
        //                 {({ values, setValues }) => (
        //                     <Form tw="w-full mt-6 grid grid-cols-[115px 450px] gap-x-7 gap-y-6">
        //                         <div css={styles.label}>Name</div>
        //                         <Field type="input" name="name" css={styles.input} />
        //                         <div css={styles.label}>Discipline</div>
        //                         <Field type="input" name="discipline" css={styles.input} />
        //                         <div css={styles.label}>Location</div>
        //                         <Field type="input" name="location" css={styles.input} />
        //                         <div css={styles.label}>Bio</div>
        //                         <Field
        //                             component="textarea"
        //                             rows="8"
        //                             name="bio"
        //                             css={[styles.input, tw`w-[710px] h-[160px] py-2 resize-none`]}
        //                         />
        //                         <div />
        //                         {isDataModified(values) && (
        //                             <div>
        //                                 <input
        //                                     type="submit"
        //                                     value="Save"
        //                                     tw="h-9 w-20 relative -top-0.5 text-white bg-theme-red rounded-[6px] px-4 py-1 cursor-pointer hover:bg-[#be4040]"
        //                                 />
        //                                 <button
        //                                     tw="ml-5 h-9 w-24 border border-[#D8D8D8] rounded-[6px] px-4 text-[#3C3C3C] text-[16px] hover:bg-[#F5F5F5]"
        //                                     onClick={() => {
        //                                         setValues({
        //                                             name: data.name,
        //                                             discipline: data.discipline,
        //                                             location: data.location,
        //                                             bio: data.bio,
        //                                         });
        //                                     }}
        //                                 >
        //                                     Cancel
        //                                 </button>
        //                             </div>
        //                         )}
        //                     </Form>
        //                 )}
        //             </Formik>
        //             <div tw="font-semibold mt-9 text-[20px]">Cover Image</div>
        //             <div tw="relative mt-6">
        //                 <div tw="w-[852px] h-[201px] bg-gray-200">
        //                     {data.coverImageURL && (
        //                         <Image
        //                             src={data.coverImageURL}
        //                             alt="Cover Photo"
        //                             layout="fill"
        //                             objectFit="cover"
        //                         />
        //                     )}
        //                 </div>

        //                 <div className="right-3 bottom-3">
        //                     <ImageUploadButton
        //                         uploadLocation={'Artists/VWOgAFjhL0BlFlbDTJZF/Cover_Photo'}
        //                         onError={(error) => {
        //                             console.log(error);
        //                         }}
        //                         onUploadComplete={async (uploadRef) => {
        //                             const app = getApp();
        //                             const db = getFirestore(app);
        //                             const gsURL = uploadRef.toString();

        //                             await updateDoc(doc(db, 'artists', artistId), {
        //                                 coverImage: gsURL,
        //                             } as Partial<ArtistData>);

        //                             const coverImageURL = await loadStorageImage(gsURL);

        //                             setData((oldData) => {
        //                                 return Object.assign({}, oldData, {
        //                                     coverImage: gsURL,
        //                                     coverImageURL: coverImageURL,
        //                                 });
        //                             });
        //                         }}
        //                     />
        //                 </div>
        //             </div>

        //             <div tw="font-semibold mt-9 text-[20px]">Education</div>
        //             <div tw="w-full mt-6 grid grid-cols-[115px 450px] gap-x-7">
        //                 <div css={styles.label}>College</div>
        //                 <div>
        //                     <button tw="h-[40px] border border-[#D8D8D8] rounded-[6px] pl-4 pr-3 text-[#3C3C3C] text-[16px] flex items-center hover:bg-[#F5F5F5]">
        //                         <Image
        //                             src="/assets/svgs/plus.svg"
        //                             alt="add education"
        //                             width="15px"
        //                             height="15px"
        //                         />
        //                         <div tw="ml-2">Add a college (coming soon)</div>
        //                     </button>
        //                     {data.education
        //                         .sort((a, b) => (b.end || 9999) - (a.end || 9999))
        //                         .map((x, i) => (
        //                             <div key={i} tw="mt-5">
        //                                 <div tw="text-[16px] text-[#3C3C3C] leading-[24px]">
        //                                     Studied{' '}
        //                                     {x.field && <span tw="font-semibold">{x.field}</span>} at{' '}
        //                                     <span tw="font-semibold">{x.school}</span>
        //                                 </div>
        //                                 <div tw="text-[16px] text-[#8B8B8B] leading-[24px] mt-1">
        //                                     {x.start}
        //                                     {x.start !== x.end && '-' + (x.end || '')}
        //                                 </div>
        //                             </div>
        //                         ))}
        //                 </div>
        //             </div>
        //             <div tw="font-semibold mt-9 text-[20px]">Career Details</div>
        //             <div tw="w-full mt-6 grid grid-cols-[115px 450px] gap-x-7 gap-y-9">
        //                 <div css={styles.label}>Work</div>
        //                 <div>
        //                     <button tw="h-[40px] border border-[#D8D8D8] rounded-[6px] pl-4 pr-3 text-[#3C3C3C] text-[16px] flex items-center hover:bg-[#F5F5F5]">
        //                         <Image
        //                             src="/assets/svgs/plus.svg"
        //                             alt="add education"
        //                             width="15px"
        //                             height="15px"
        //                         />
        //                         <div tw="ml-2">Add a workplace (coming soon)</div>
        //                     </button>
        //                     {data.experience
        //                         .sort((a, b) => (b.end || 9999) - (a.end || 9999))
        //                         .map((x, i) => (
        //                             <div key={i} tw="mt-5">
        //                                 <div tw="text-[16px] text-[#3C3C3C] leading-[24px] font-semibold">
        //                                     {x.position !== undefined && (
        //                                         <>
        //                                             {x.position} <span tw="font-normal"> at </span>
        //                                         </>
        //                                     )}
        //                                     {x.company}
        //                                 </div>
        //                                 <div tw="text-[16px] text-[#8B8B8B] leading-[24px] mt-1">
        //                                     {x.start}
        //                                     {x.start !== x.end && '-' + x.end}
        //                                 </div>
        //                             </div>
        //                         ))}
        //                 </div>
        //                 <div css={styles.label}>Exhibition</div>
        //                 <div>
        //                     <button tw="h-[40px] border border-[#D8D8D8] rounded-[6px] pl-4 pr-3 text-[#3C3C3C] text-[16px] flex items-center hover:bg-[#F5F5F5]">
        //                         <Image
        //                             src="/assets/svgs/plus.svg"
        //                             alt="add education"
        //                             width="15px"
        //                             height="15px"
        //                         />
        //                         <div tw="ml-2">Add an exhibition (coming soon)</div>
        //                     </button>
        //                     {data.exhibitions
        //                         .sort((a, b) => b.year - a.year)
        //                         .map((exhibition, i) => (
        //                             <div key={i} tw="mt-5">
        //                                 <div tw="text-[16px] text-[#3C3C3C] leading-[24px] font-semibold">
        //                                     {exhibition.gallery}
        //                                 </div>
        //                                 <div tw="text-[16px] text-[#8B8B8B] leading-[24px]">
        //                                     {exhibition.year}
        //                                 </div>
        //                             </div>
        //                         ))}
        //                 </div>
        //             </div>
        //         </>
        //     )}
        // </div>
    );
}
