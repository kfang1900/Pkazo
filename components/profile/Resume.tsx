import { Artist, showEdu, showExp, showExh, Education, Experience, Exhibition } from 'obj/Artist';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
function Resume(artistData: QueryDocumentSnapshot<DocumentData>[]) {
    const artist = artistData[0].data()
    console.log(artist)

    return (
        <div tw="grid grid-cols-3 gap-16 mt-7 w-full">
            <div tw="flex-grow">
                <div tw="text-black text-[20px] leading-[27px] mb-2 font-semibold">
                    Education
                </div>
                {artist?.Education
                    .map((x: Education, i: number) => (
                        <div key={i} tw="mt-4">
                            {showEdu(x)}
                        </div>
                    ))}
            </div>
            <div tw="flex-grow">
                <div tw="text-black text-[20px] leading-[27px] font-semibold">
                    Experience
                </div>
                {artist?.Experience
                    .map((x: Experience, i: number) => (
                        <div key={i} tw="mt-4">
                            {showExp(x)}
                        </div>
                    ))}
            </div>
            <div tw="flex-grow">
                <div tw="text-black text-[20px] leading-[27px] font-semibold">
                    Exhibitions
                </div>
                {artist?.Exhibitions
                    .map((x: Exhibition, i: number) => (
                        <div key={i} tw="mt-4">
                            {showExh(x)}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Resume
