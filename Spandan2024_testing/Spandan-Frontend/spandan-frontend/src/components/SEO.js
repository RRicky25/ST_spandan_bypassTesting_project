import { SuperSEO } from "react-super-seo";

const SEOComponent = ({ page_name }) => {
    return (
        <SuperSEO
            title={page_name + " | Spandan 2024"}
            description="The annual intra-college sports fest of IIIT Bangalore"
            lang="en"
            openGraph={{
                ogImage: {
                    ogImage: "https://spandan.vercel.app/seo/ogspandan.png",
                    ogImageAlt: "Spandan IIITB 2024",
                    ogImageWidth: 1200,
                    ogImageHeight: 630,
                    ogImageType: "image/png",
                },
            }}
            twitter={{
                twitterSummaryCard: {
                    summaryCardImage: "https://spandan.vercel.app/seo/ogspandan.png",
                    summaryCardImageAlt: "Spandan '24",
                    summaryCardSiteUsername: "rithwiksai",
                },
            }}
        />
    )
}

export default SEOComponent;