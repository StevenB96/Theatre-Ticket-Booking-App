// src/app/admin/about/page.tsx

export default async function AboutPage() {
    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">About The Project</h1>
            </div>
            <p className="whitespace-pre-wrap">{`Hi! Thank you for viewing this project. With this application I hope to demonstrate my NextJS ability. NextJS is a fullstack framework which is based around react but includes a fully fledged JS Server. NextJS server includes many features, but what I value it most for is performance optimisation. With careful optimisation, even with modest hardwark you can get repsonses down below the 100ms barrier.\n\nI am a member of a musical theatre choir (not so much a fan of musicals). In any case, I buy theatre tickets and I took ticket websites as my inspiration. The features I aim to develop are: an administation portal that enables admins to manage content, and understand the current state of the application by interacting with graphs and visualisations. I also want to develop an attractive website for users that provides a seemless theatre ticket booking experience.\n\nOther technologies I am exhibiting are Docker, TailwindCSS, SQL and cloud deployment.`}</p>
        </div>
    );
}
