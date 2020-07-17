import React from 'react';
import { Layout } from '../Layout';
import './styles.scss';
import { Filter } from './Filter';
import { useState } from 'react';
import { Bookmark } from './Bookmark';


const filter_list = [
    'T-Shirt',
    'Popsocket',
    'Sweatshirt',
    'Longsleeves',
    'Premium',
];

function Trial(props) {

    return (
        <div id="trial" className="hp row text-center padding_1">
          You are using a trial version
        </div>
    );
}

function Main({ data, _selected_filter }) {

    const [selected_filter, setSelectedFilter] = useState(_selected_filter || '');

    console.log(selected_filter);

    const main = {
        filter: {
            get: selected_filter,
            set: setSelectedFilter
        }
    };

    const filters = filter_list.map((filter) => {
        const isSelected = filter === selected_filter;
        return (
            <div key={filter} className="hp row col-na-6 padding_5">
                <Filter selected={isSelected || false}
                    name={filter} main_filter={{ ...main.filter }} />
            </div>
        );
    });

    const bookmarks =  data.bookmarks.map((bookmark) => {
        console.log(1)
        return <Bookmark key={bookmark} bookmark={bookmark}/>
    });
    console.log(bookmarks);

    const trial = data.subs === 'trial' ? <Trial /> : '';

    return (
        <Layout noback={true}>
            {trial}
            <div className="hp row col flex-column">
                <div className="hp row switch flex2 flex v-center padding1">
                    <div className="">
                        <div className="checkbox-container yellow">
                            <input type="checkbox" id="toggle" className="toggle" data-type="state" />
                            <label htmlFor="toggle"></label>
                            <div className="active-circle"></div>
                        </div>
                    </div>
                    <div className="hp flex1 text-center">
                        Searches Left: 3
                    </div>
                    <div id="logout" className="">
                        <img className="small-icon" src="/logout.svg" alt="logout" />
                    </div>
                </div>
                <div className="hp row flex24 flex-column padding2 padding-top_0">
                    <div className="hp row flex8">
                        <div className="hp row bold padding-bottom_5 font-size1">
                            Always-on Filters
                        </div>
                        <div className="hp row flex flex-wrap h-center font-size_6">
                            {filters}
                        </div>
                    </div>
                    <div className="hp row flex8 flex-column margin-bottom_-5">
                        <div className="hp row">
                            <div className="row col-na-6">
                                <div className="hp bold inline font-size1">
                                    Bookmark&nbsp;
                                </div>
                                <p id="bookmark-count" className="hp font-size_6 inline">
                                    ({data.bookmarks.length})
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
                                {bookmarks}
                                {/* <div className="hp row font-size_8 padding-top_4 padding-bottom_4 flex v-center">
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
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )

}

export { Main };