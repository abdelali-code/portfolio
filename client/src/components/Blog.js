import React from "react";

import Loading from "./Loading";

const RenderArticles = ({ articles }) => {
    const prs = articles.map(art => {
        return (
            <div key={art.id}>
                <img src={art.image} alt={art.title} />
                <div>
                    <h3>{art.title}</h3>
                    <p>{art.content}</p>
                </div>
            </div>
        );
    })
    return prs;
}



const LatestArticles = (props) => {
    const { articles, errMess, isLoading } = props;

    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (errMess) {

        return (
            <div className="text-danger text-center">
                {errMess}
            </div>
        );
    }
    else {
        return (
            <div className="articles">
                <div className="articlesInfo container">
                    <h3 className="title">latest Articles</h3>
                    <div className="article">
                        <RenderArticles articles={articles} />
                    </div>
                </div>
            </div>
        );
    }
}

export default LatestArticles;