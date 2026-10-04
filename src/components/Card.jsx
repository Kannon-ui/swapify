function Card({type, image, title, rating, description, accepts, date, summary, onProposeSwap, isOwner = false, offers = []}){
    const tags = accepts ? accepts.split(' or ').map(tag=> tag.trim()) : [];
    return(
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-1g hover:scale-105 transition duration-300" >
            <img src={image} alt={title} className="w-full h-48 object-cover"/>
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-3"> {title} </h3>
                <div className="mb-3 flex items-center gap-2">
                    <span className="text-sm text-grey-500">Condition: </span>
                    <span className="text-yellow-400">
                        {Array.from({length: 5}).map((_,i) => (i < rating ? '★' :'☆' ))}
                    </span>
                </div>
                <p className="text-gray-700 mb-4 "> {description} </p>
                { type === 'open' && (
                    <>
                <div className="mb-5">
                    <span>
                        Swap for: 
                    </span>
                    {tags.map((tag, index) => (
                        <span key = {index}>
                            {tag}
                        </span>
                    ))}
                </div>

                {!isOwner  && (
                    <button
                    onClick={onProposeSwap}
                    className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-700 transition font-medium">
                        Propose Swap
                    </button>
                )}
                
                {!isOwner  && (
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold mb-2">Offers:</h4>
                        {offers.length > 0 ?(
                            offers.map(offer => (
                                <div key={offer.id} className="text-sm text-gray-700 mb-1">
                                    {offer.name} - {offer.contact} - {offer.propose}
                                </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No offers yet</p>
                    )
                }
                    </div>
                )}
                </>
                )}
                {type == 'closed' &&(
                    <>
                    <p className="text-sm text-gray-500 mb-2">Date: {date}</p>
                    <p className="text-gray-700">{summary}</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default Card