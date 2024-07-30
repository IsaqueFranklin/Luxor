export default function Pricing(){

    const plans = [
        {
            name: "Standard",
            desc: "Yearly plan to get access to resources to kickstart your Bitcoin journey. Enjoy user-friendly content designed for beginners, along with ongoing updates about Bitcoin.",
            price: 15,
            isMostPop: true,
            features: [
                "Best Bitcoin books summaries",
                "Usefull Bitcoin article summaries",
                "Easy tutorials for beginners",
                "A collection of usefull AI prompts",
                "Youtube, Twitter/X best content lists",
                "Frequent and continous content updates",
                "Weekly newsletter about Bitcoin",
            ],
        },
    ];

    return (
        <section className='relative py-8 max-w-5xl'>
            <div className='absolute inset-0 max-w-lg mx-auto h-[400px] sm:max-w-3xl sm:h-[200px] blur-[118px]' style={{ background: "linear-gradient(106.89deg, rgba(0, 102, 204, 0.05) 15.73%, rgba(14, 165, 233, 0.2) 15.74%, rgba(0, 51, 102, 0.1) 56.49%, rgba(0, 0, 128, 0.2) 115.91%)"}}></div>
            <div className="relative max-w-screen-xl mx-auto sm:px-4 md:px-8">
                <div className='max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0'>
                    <h3 className="text-blue-600 font-semibold">
                        Planos
                    </h3>
                    <p className='text-3xl mb-4 font-bold sm:text-4xl'>
                        A simplicidade de um plano único.
                    </p>
                    <div className='max-w-xl'>
                        <p className="mt-6">
                            Only one plan option with all of the features of our platform. Pay yearly and receive updates, new contents and tutorials.
                        </p>
                    </div>
                </div>
                <div className='mt-16 justify-center sm:flex'>
                    {
                        plans.map((item, idx) => (
                            <div key={idx} className={`relative flex-1 flex flex-col mt-6 border-2 sm:mt-0 sm:rounded-xl sm:max-w-md ${item.isMostPop ? "border-blue-600 rounded-lg mx-4 px-2 md:px-0 md:mx-0" : "border-transparent"}`}>
                                <div className="p-4 py-8 space-y-4 border-b border-blue-600 md:p-8">
                                    <span className='font-medium'>
                                        {item.name}
                                    </span>
                                    <div className='text-3xl md:text-5xl font-semibold'>
                                        ${item.price} <span className="text-xl md:text-2xl font-normal">/ year</span>
                                    </div>
                                    <p className="">
                                        {item.desc}
                                    </p>
                                    <a href="/signup" className="hover:no-underline mt-6">
                                        <button className='px-3 py-3 mt-6 rounded-lg w-full font-semibold text-sm duration-150 btn bg-blue-600 text-white'>
                                            Get Started
                                        </button>
                                    </a>
                                </div>
                                <ul className='p-4 py-8 space-y-3 md:p-8'>
                                    {
                                        item.features.map((featureItem, idx) => (
                                            <li key={idx} className='flex items-center gap-5'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    className={`h-5 w-5 ${item.isMostPop ? "text-blue-800" : ""}`}
                                                    viewBox='0 0 20 20'
                                                    fill='currentColor'>
                                                    <path
                                                        fill-rule='evenodd'
                                                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                        clip-rule='evenodd'></path>
                                                </svg>
                                                {featureItem}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};
