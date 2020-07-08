/* const message = {
    get: function (key) {
        return {
            type: 'STORAGE_GET',
            key: key
        }
    },
    set: function (key, value) {
        return {
            type: 'STORAGE_SET',
            key: key,
            value: value
        }
    }
}


const event_def = {
    click: [
        {
            selector: '.toggle',
            handler: handleToggleClick
        },
        {
            selector: '.forward',
            handler: navigationClickHandler
        },
        {
            selector: '.back',
            handler: navigationClickHandler
        },
        {
            selector: '.delete-bookmark',
            handler: handleBookmarkDelete
        },
        {
            selector: '.export-to',
            handler: handleExport
        },
        {
            selector: '.info-pane-open',
            handler: handleInfoOpen
        },
        {
            selector: '.info-pane-close',
            handler: handleInfoClose
        }
    ]
}


function allotListeners() {

    for (const event of Object.keys(event_def)) {

        event_def[event].forEach((ev) => {

            const elements = document.querySelectorAll(ev.selector);
            console.log(ev.selecor, elements);
            elements.forEach((element) => {
                element.addEventListener(event, ev.handler);

            });

        });

    }

}

function sendMessage(message) {

    return new Promise((resolve) => {

        chrome.runtime.sendMessage(message, resolve);

    });

}


function toggleActivation(key, value, element) {

    const msg = message.set(key, value);

    sendMessage(msg)
        .then(() => {
            toggleToggle(value, element);
        });

}


function toggleToggle(value, element) {

    // alert(element);

    const toggle = element; // ? element : document.getElementById('toggle');
    const label = toggle.parentElement.children[1];
    const checked = value ? true : false;

    toggle.checked = checked;

    label.style.backgroundColor = checked ? '#F57200' : '#aaa';

    if (toggle.dataset.type === 'state') {

        const status = document.getElementById('status');

        status.innerText = checked ? 'ACTIVE' : 'INACTIVE';

    }
    else {

        const filter_toggles = document.querySelectorAll('input[data-type="filter"]');

        filter_toggles.forEach((filter) => {

            if (filter === toggle) return ;

            filter.checked = false;

            const label = filter.parentElement.children[1];

            label.style.backgroundColor = '#aaa';

        })

    }

}


function handleToggleClick(e) {

    console.log(e);

    const element = e.currentTarget;
    const type = element.dataset.type;
    const key = type === 'state' ? type : 'recent_filter';

    const value = element.checked ?
        (
            type === 'state' ?
                true : element.dataset.filter
        ) :
        (
            type === 'state' ?
                false : ''
        );

        console.log(key, value);

    toggleActivation(key, value, element);

}


function getStyleText(type) {

    switch (type) {

        case 'forward': return 'transform: translateX(-280px)';

        case 'back': return 'transform: translateX(0)';

    }

}


function toggleTabContent(tab_content_id) {

    if (!tab_content_id) {
        return document.querySelectorAll('.tab-content').forEach((el) => el.style.display = 'none');
    }

    const tab_content_el = document.querySelector('#' + tab_content_id);
    tab_content_el.style.display = 'block';

}


function navigationClickHandler(e) {

    const element = e.currentTarget;

    const tab_container = document.querySelector('#tab-container');

    tab_container.style.cssText = getStyleText(element.classList[1]);

    toggleTabContent(element.dataset.open)

}


function filterList(list, reducer) {

    return list.filter(reducer);

}


function handleBookmarkDelete(e) {

    const element = e.currentTarget;

    const list_item = element.closest('.list-item');

    const url = list_item.querySelector('a').href;

    const msg = {
        get: message.get('bookmarks'),
        set: (value) => message.set('bookmarks', value)
    };

    sendMessage(msg.get)
        .then((bookmarks) => {

            const updated_bookmarks = filterList(bookmarks, (item) => item.bookmark_info.url !== url);

            sendMessage(msg.set(updated_bookmarks))
                .then(() => {

                    list_item.remove();

                    chrome.tabs.query({
                        active: true,
                        currentWindow: true
                    }, (tabs) => {
                        chrome.tabs.sendMessage(
                            tabs[0].id,
                            { action: 'toggleBookmarkStyle', url: url }
                        );
                    });

                });

        });

}

function consideNumbers(number) {

    let percent = number * 100;

    const number_string = percent.toString();

    const decimal_pos = number_string.indexOf('.')

    if (decimal_pos >= 0) {

        const decimal_count = number_string.slice(decimal_pos,).length;

        if (decimal_count > 2) percent = percent.toFixed(2);

    }

    return Number(percent)

}


const exportTo = function (data) {

    const base_file_name = 'merch-impluse-stats';

    const getDateTime = function () {

        function toTens(value) {

            const string = value.toString();

            return string.length == 1 ? '0' + string : string;
        }

        const today = new Date();

        const date = toTens(today.getFullYear()) + '-' + toTens(today.getMonth() + 1) + '-' + toTens(today.getDate());
        const time = toTens(today.getHours()) + ":" + toTens(today.getMinutes()) + ":" + toTens(today.getSeconds());

        return date + ' ' + time;

    }


    function refineData(data) {

        // data.forEach((data_node) => {
        //     data_node.stats.score.forEach((score, index) => {
        //         data_node.stats.score[index] = {
        //             [Object.keys(score)[0]]: consideNumbers(Object.values(score)[0])
        //         };
        //     })
        // })

        return data;

    }


    const provider = 'Merch Impulse';

    function getDownloadObject(type, download_data) {

        const type_def = {
            json: {
                extension: '.json',
                format: 'data:text/plain;charset=utf-8'
            },
            csv: {
                extension: '.csv',
                format: 'data:text/csv;charset=utf-8',
            },
            xls: {
                extension: '.xls',
                format: 'data:application/vnd.ms-excel'
            }
        }

        return {
            file_name: base_file_name + type_def[type].extension,
            download_data: type_def[type].format + ',' + download_data
        };

    }


    const format = {
        json: function (data) {

            const download_data = {
                provider: provider,
                exported_on: getDateTime(),
                bookmarks: refineData(data)

            };

            const json_string = JSON.stringify(download_data, null, 4);

            return (
                download(
                    getDownloadObject(
                        'json',
                        encodeURIComponent(json_string)
                    )
                )
            );

        },
        csv: function (data) {

            data = refineData(data);

            let csv_content = [
                ['provider', 'Merch Impulse'],
                ['exported on', getDateTime()],
            ]

            data.forEach((data_node, index) => {

                const _rows = [[]];

                for (const key of Object.keys(data_node)) {

                    const content = data_node[key];

                    for (const [_key, _value] of Object.entries(content)) {
                        if (key === 'table') {
                            if (_key === 'sold_products') _rows.push([_key, content[_key][0]]);
                            else {
                                _rows.push([
                                    _key,
                                    [content[_key].highest, content[_key].lowest, content[_key].average]
                                        .join(',')
                                ]);
                            }
                        }
                        else {
                            _rows.push([_key, _value]);
                        }
                    }
                }


                csv_content.push(..._rows)
                csv_content.push([])

            });


            csv_content = (csv_content.map((row) => row.join(',') + '\n')).join('');

            return (
                download(
                    getDownloadObject(
                        'csv',
                        encodeURIComponent(csv_content)
                    )
                )
            );

        },
        xls: function (data) {

            const table = function () {

                const base_info = [
                    { th: ['Provider', 'Exported on'] },
                    { td: ['Merch Impulse', getDateTime()] },
                    { td: [''] }
                ];

                const row_def = [
                    ...base_info,
                    {
                        th: [
                            '#',
                            'Search Date',
                            'URL',
                            'Search Term',
                            'Profitability',
                            'Competition',
                            'Overall Score',
                            '', 'BSR', '',
                            '', 'Ratings', '',
                            '', 'Reviews', '',
                            'Sold Products'
                        ]
                    },
                    {
                        th: [
                            '', '', '', '', '', '', '',
                            'Highest', 'Lowest', 'Average',
                            'Highest', 'Lowest', 'Average',
                            'Highest', 'Lowest', 'Average',
                            ''
                        ]
                    },
                ]

                data.forEach((data_node, index) => {

                    // console.log(data_node.bookmark_info.search_date)

                    const bookmark_info = data_node.bookmark_info;
                    const score = data_node.score;
                    const table = data_node.table;

                    const row = [
                        {
                            td: [
                                index + 1,
                                bookmark_info.search_date,
                                bookmark_info.url,
                                bookmark_info.search_term,
                                score.profitability,
                                score.competition,
                                score.overall_score,
                                table.bsr.highest,
                                table.bsr.lowest,
                                table.bsr.average,
                                table.ratings.highest,
                                table.ratings.lowest,
                                table.ratings.average,
                                table.reviews.highest,
                                table.reviews.lowest,
                                table.reviews.average,
                                table.sold_products[0]
                            ]
                        }
                    ]
                    // console.log(row);

                    row_def.push(...row);

                });

                // console.log(row_def);

                const rows = function () {

                    return row_def.map((row) => {

                        const tag = Object.keys(row)[0];

                        return `<tr>${row[tag].map(
                            (cell) => `<${tag}>${cell}</${tag}>`)
                            .join('')}</tr>`;

                    }).join('');

                }();

                // console.log(rows);

                return `<table><tbody>${rows}</tbody></table>`;

            }();

            // console.log(table);

            download(getDownloadObject('xls', encodeURIComponent(table)));

        }
    }

    function download(downloadObject) {

        const { file_name, download_data } = downloadObject;

        // console.log(download_data);

        const download_link = document.createElement('a');

        download_link.setAttribute('href', download_data);
        download_link.setAttribute('download', file_name);

        document.body.appendChild(download_link);

        download_link.click();
        download_link.remove();
    }

    return {
        json: format.json,
        csv: format.csv,
        xls: format.xls
    }

}()


function handleExport(e) {

    const element = e.currentTarget;
    const export_type = element.dataset.type;

    const msg = message.get('bookmarks');
    sendMessage(msg)
        .then((bookmarks) => {
            exportTo[export_type](bookmarks);
        });

}


function showInfoPane(bookmark) {

    const info_pane = document.querySelector('.info-pane');
    const info_list = info_pane.querySelector('.info-pane-list');

    console.log(bookmark)

    const info_list_def = [
        {
            text: 'Exported On',
            value: bookmark.bookmark_info.search_date
        },
        {
            text: 'Profitability',
            value: bookmark.score.profitability
        },
        {
            text: 'Competition',
            value: bookmark.score.competition
        },
        {
            text: 'Overall Score',
            value: bookmark.score.overall_score
        }
    ]


    let info_list_content = info_list_def.map((info) => {

        if (info.text !== 'Exported On') {
            info.value = `${consideNumbers(info.value)}%`;
        }
        
        return (
            `<li class="list-item info-pane-item">
                <div class="info-pane-item-content">
                    <div class="left-content">${info.text}</div>
                    <div class="right-content">${info.value}</div>
                </div>
            </li>`
        )

    }).join('');
    

    const parser = new DOMParser();
    const dom = parser.parseFromString(info_list_content, 'text/html');
    
    Array.from(dom.body.children).forEach((li) => {

        info_list.appendChild(li);

    });

    info_pane.style.display = 'block';

}


function handleInfoOpen(e) {

    const element = e.currentTarget;
    const list_item = element.closest('.list-item');
    const url = list_item.querySelector('a').href;
    const msg = message.get('bookmarks');

    sendMessage(msg)
        .then((bookmarks) => {

            const this_bookmark = bookmarks.filter((bookmark) => bookmark.bookmark_info.url === url)[0];

            showInfoPane(this_bookmark);

        })


}


function handleInfoClose(e) {

    const element = e.currentTarget;

    const info_pane = element.closest('.info-pane');

    const info_list = info_pane.querySelector('.info-pane-list');
    info_list.innerHTML = '';
    info_pane.style.display = 'none';

}

// function requester(msg, callback) {

//     // console.log('here');

//     return new Promise((resolve) => {

//         sendMessage(msg.get)
//             .then((response) => {

//                 resolve(response);

//                 // // console.log(response);

//                 // if (response === undefined) {
//                 //     sendMessage(msg.set)
//                 //         .then(() => resolve());
//                 // }
//                 // else {
//                 //     callback(response);
//                 //     resolve(
//                 //         // console.log('resolved')
//                 //     );
//                 // }


//             })

//     });

// }


function loadStatus(state) {

    // const key = 'state';

    // const msg = {
    //     get: message.get(key),
    //     set: message.set(key, false)
    // };

    // return requester(msg, toggleToggle);

    const extension_toggle = document.getElementById('toggle');
    toggleToggle(state, extension_toggle);

}


function populateBookmarks(bookmarks) {

    if (!bookmarks) return;

    const bookmark_list = document.getElementById('bookmark-list');

    bookmarks.forEach((bookmark) => {

        const html_string = `<li class="list-item">
            <div class="bookmark-node">
                <div class="link-text bookmark-link-text">
                    <a href="${bookmark.bookmark_info.url}">
                        ${bookmark.bookmark_info.search_term}
                    </a>
                </div>
                <div class="bookmark-options">
                    <div class="bookmark-option">
                        <button id="info-show" class="info-pane-open round-button">i</button>
                    </div>
                    <div class="bookmark-option">
                        <button class="delete-bookmark">remove</button>
                    </div>
                </div>
            </div>
        </li>`;

        const parser = new DOMParser();
        const dom = parser.parseFromString(html_string, 'text/html');
        const list_item = dom.body.children[0];

        bookmark_list.appendChild(list_item);

    });

}

function setFilter(filter_name) {

    if (!filter_name) return ;

    const element = document.getElementById('toggle-' + filter_name);

    toggleToggle(filter_name, element);

}


function fetchData() {

    const key = null;

    const msg = message.get(key);

    // return requester(msg, populateBookmarks);
    return sendMessage(msg)
}

function initialize() {

    // loadStatus()
    //     .then(() => {
    //         fetchData()
    //             .then(() => {
    //                 allotListeners();
    //             });
    //     });

    fetchData()
        .then((data) => {
            console.log(data);
            loadStatus(data.state);
            populateBookmarks(data.bookmarks);
            setFilter(data.recent_filter);
            allotListeners();
        })
    

}

initialize(); */

middleware();