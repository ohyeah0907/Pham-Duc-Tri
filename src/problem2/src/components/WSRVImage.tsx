import clsx from 'clsx'

type WSRVImageProps = {
    sources?: {
        media: string
        srcSet: string
        sourceWrsvParams?: string
    }[]
    alt: string
    src: string
    imgWrsvParams?: string
    classes?: {
        root?: string
        img?: string
    }
}

export const WSRVImage: React.FC<WSRVImageProps> = ({
    sources,
    src,
    imgWrsvParams,
    classes,
    alt,
}: WSRVImageProps) => {
    return (
        <>
            <picture className={`${clsx(classes?.root)}`}>
                {sources?.map((source, index) => (
                    <source
                        key={index}
                        media={source.media}
                        srcSet={`//wsrv.nl/?url=${source.srcSet}${source.sourceWrsvParams || ''}`}
                    />
                ))}
                <img
                    src={`//wsrv.nl/?url=${src}${imgWrsvParams || ''}`}
                    className={`${clsx(classes?.img)}`}
                    alt={alt}
                />
            </picture>
        </>
    )
}
