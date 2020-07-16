import React from 'react';
import { Layout } from '../Layout';
import './styles.scss';

function Main() {

    return (
        <Layout noback={true}>
            <div className="hp row col flex-column">
                <div className="hp row switch flex2 flex v-center margin-bottom1">
                    <div className="">
                        <div class="checkbox-container yellow">
                            <input type="checkbox" id="toggle" class="toggle" data-type="state" />
                            <label for="toggle"></label>
                            <div class="active-circle"></div>
                        </div>
                    </div>
                    <div className="hp flex1 text-center">
                        Searches Left: 3
                    </div>
                    <div id="logout" className="">
                        <img className="small-icon" src="/logout.svg" alt="logout"/>
                    </div>
                </div>
                <div className="hp row flex24 flex-column">
                    <div className="hp row flex8">
                        <div className="hp row bold padding-bottom_5 font-size1">
                            Always-on Filters
                        </div>
                        <div className="hp row flex flex-wrap h-center font-size_6">
                            <div className="hp row col-na-6 padding_5">
                                <div className="hp row col-na-12 border_1 padding_5 text-center filter">
                                    T-shirt
                                </div>
                            </div>
                            <div className="hp row col-na-6 padding_5">
                                <div className="hp row col-na-12 border_1 padding_5 text-center filter">
                                    Longsleeves
                                </div>
                            </div>
                            <div className="hp row col-na-6 padding_5">
                                <div className="hp row col-na-12 border_1 padding_5 text-center filter">
                                    Popsocket
                                </div>
                            </div>
                            <div className="hp row col-na-6 padding_5">
                                <div className="hp row col-na-12 border_1 padding_5 text-center filter">
                                    Sweatshirt
                                </div>
                            </div>
                            <div className="hp row col-na-6 padding_5">
                                <div className="hp row col-na-12 border_1 padding_5 text-center filter selected">
                                    Premium
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hp row flex8 flex-column margin-bottom_-5">
                        <div className="hp row">
                            <div className="row col-na-6">
                                <div className="hp bold inline font-size1">
                                    Bookmark&nbsp;
                                </div>
                                <p className="hp font-size_6 inline">
                                    (20)
                                </p>
                            </div>
                            <div className="hp row col-na-6 text-right underline">
                                <a href="#!">
                                    Manage
                                </a>
                            </div>
                        </div>
                        <div id="bookmark-list" className="hp row">
                            <div className="hp row col">
                                <div className="hp row font-size_8 padding-top_4 padding-bottom_4 flex v-center">
                                    <div className="hp flex4 ellipsis" title="Ginchillaasdasdasd">Ginchillaasdasdasd</div>
                                    <div className="hp flex3 text-center">1 day ago</div>
                                    <div className="hp flex1 text-center">
                                        <a href="#!">
                                            <img className="small-icon" src="/out.svg" alt="out" />
                                        </a>
                                    </div>
                                </div>
                                <div className="hp row font-size_8 padding-top_4 padding-bottom_4 flex v-center">
                                    <div className="hp flex4 ellipsis" title="Ginchillaasdasdasd">Ginchillaasdasdasd</div>
                                    <div className="hp flex3 text-center">1 day ago</div>
                                    <div className="hp flex1 text-center">
                                        <img className="small-icon" src="/out.svg" alt="out" />
                                    </div>
                                </div>
                                <div className="hp row font-size_8 padding-top_4 padding-bottom_4 flex v-center">
                                    <div className="hp flex4 ellipsis" title="Ginchillaasdasdasd">Ginchillaasdasdasd</div>
                                    <div className="hp flex3 text-center">1 day ago</div>
                                    <div className="hp flex1 text-center">
                                        <img className="small-icon" src="/out.svg" alt="out" />
                                    </div>
                                </div>
                                <div className="hp row font-size_8 padding-top_4 padding-bottom_4 flex v-center">
                                    <div className="hp flex4 ellipsis" title="Ginchillaasdasdasd">Ginchillaasdasdasd</div>
                                    <div className="hp flex3 text-center">1 day ago</div>
                                    <div className="hp flex1 text-center">
                                        <img className="small-icon" src="/out.svg" alt="out" />
                                    </div>
                                </div>
                                <div className="hp row font-size_8 padding-top_4 padding-bottom_4 flex v-center">
                                    <div className="hp flex4 ellipsis" title="Ginchillaasdasdasd">Ginchillaasdasdasd</div>
                                    <div className="hp flex3 text-center">1 day ago</div>
                                    <div className="hp flex1 text-center">
                                        <img className="small-icon" src="/out.svg" alt="out" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )

}

export { Main };