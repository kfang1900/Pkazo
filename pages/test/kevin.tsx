import 'twin.macro'

const GFP = () => {
    return <div tw=''>
        <div tw='flex'>
            {
                ['a', 'b', 'c', 'd', 'e'].map((x, i) => {
                    return <div key={x} tw='w-10 h-10 border border-black rounded-[10px] text-center'>
                        {x}, {i}
                    </div>
                }
                )
            }
        </div>

    </div >
}

export default GFP;