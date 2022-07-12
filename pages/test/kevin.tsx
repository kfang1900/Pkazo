import 'twin.macro'

const GFP = () => {
    return <div tw=''>
        <div tw='flex'>
            <div tw='bg-red-500 w-[200px] h-[200px]' />
            <div tw='w-full'>
                <div tw='flex'>
                    <div tw='bg-green-500 w-full h-[100px]' />
                    <div tw='bg-black w-[50px] h-[100px]' />
                    <div tw='bg-pink-500 w-[50px] h-[100px]' />
                </div>
                <div tw='bg-blue-500 w-full h-[50px]' />
                <div tw='bg-pink-500 w-full h-[50px]' />
            </div>
        </div>

    </div >
}

export default GFP;