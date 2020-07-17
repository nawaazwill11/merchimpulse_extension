import React from 'react';
import { Filter } from '../Filter';
import { Bookmark } from '../Bookmark';
import { CurvedArrow } from '../../CurvedArrow';

function Inactive({ type, active }) {

    const show = {
        expired: function () {
            return (
                <div className="hp flex-column h-center margin-bottom-4">
                    <h1>Expired</h1>
                    <a className="hp btn btn-primary"
                        href="#!">
                        Buy subscription
                    </a>
                </div>
            );
        }(),
        inactive: function () {
            return (
                <div className="hp flex-column h-center margin-bottom_-4">
                    <div className="hp font-size2 bold margin-bottom_5">
                        Inactive
                    </div>
                    <div className="hp font-size1">
                        Click this to turn on
                    </div>
                    <CurvedArrow />
                </div>
            );

        }()
    };


    return (
        <div className="hp row flex h-center v-center">
            {show[type]}
        </div>
    );
}

function Active({ selected_filter, data }) {

    const filter_list = [
        'T-Shirt',
        'Popsocket',
        'Sweatshirt',
        'Longsleeves',
        'Premium',
    ];

    const filters = filter_list.map((filter) => {

        const isSelected = filter === selected_filter.get;

        return (
            <div key={filter} className="hp row col-na-6 padding_5">
                <Filter selected={isSelected || false}
                    name={filter} selected_filter={selected_filter} />
            </div>
        );
    });

    const bookmarks = data.bookmarks.map((bookmark) => {
        return <Bookmark key={bookmark} bookmark={bookmark} />
    });

    return (
        <div className="hp row flex24 flex-column">
            <div className="hp row flex1">
                <div className="hp row bold padding-bottom_5 font-size1">
                    Always-on Filters
                        </div>
                <div className="hp row flex flex-wrap h-center font-size_6">
                    {filters}
                </div>
            </div>
            <div className="hp row flex1 flex-column margin-bottom_-5">
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
                    <div className="hp row col padding_5 padding-top0 padding-bottom0">
                        {bookmarks}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Features({ data, state, active, selected_filter }) {

    if (state.get === 'expired' || !active.get) {
        return (
            <Inactive type={data.subs === 'expired' ? 'expired' : 'inactive'} active={active} />
        )
    }

    return (
        <Active selected_filter={selected_filter} data={data} />
    )

}

export { Features }