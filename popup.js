const message = {
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
            selector: '#toggle',
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
            selector: '.delete',
            handler: handleBookmarkDelete
        },
        {
            selector: '.export-to',
            handler: handleExport
        }
    ]
}


function allotListeners() {

    for (const event of Object.keys(event_def)) {

        event_def[event].forEach((ev) => {

            const elements = document.querySelectorAll(ev.selector);
            elements.forEach((element) => {
                element.addEventListener(event, ev.handler)
            });

        });

    }

}

function sendMessage(message) {

    return new Promise((resolve) => {

        chrome.runtime.sendMessage(message, resolve);

    });

}


function toggleActivation(active) {

    const msg = message.set('state', active);

    console.log(active);

    sendMessage(msg)
        .then(() => {
            toggleToggle(active);
        });

}


function toggleToggle(checked) {

    const toggle = document.getElementById('toggle');
    const label = toggle.parentElement.children[1];

    toggle.checked = checked;

    const status = document.getElementById('status');

    const value_def = {
        true: {
            color: '#F57200',
            text: 'ACTIVE'
        },
        false: {
            color: '#aaa',
            text: 'INACTIVE'
        }
    }

    status.style.color = value_def[checked].color;
    status.innerText = value_def[checked].text;
    label.style.backgroundColor = value_def[checked].color;

}


function handleToggleClick(e) {

    const element = e.currentTarget;

    const active = element.checked ? true : false;

    toggleActivation(active);

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


const exportTo = function (data) {

    const base_file_name = 'merch-impluse-stats';

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

                    console.log(data_node.bookmark_info.search_date)

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
                    console.log(row);

                    row_def.push(...row);

                });

                console.log(row_def);

                const rows = function () {

                    return row_def.map((row) => {

                        const tag = Object.keys(row)[0];

                        return `<tr>${row[tag].map(
                            (cell) => `<${tag}>${cell}</${tag}>`)
                            .join('')}</tr>`;

                    }).join('');

                }();

                console.log(rows);

                return `<table><tbody>${rows}</tbody></table>`;

            }();

            console.log(table);

            download(getDownloadObject('xls', encodeURIComponent(table)));

        }
    }

    function download(downloadObject) {

        const { file_name, download_data } = downloadObject;

        console.log(download_data);

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


function requester(msg, callback) {

    console.log('here');

    return new Promise((resolve) => {

        sendMessage(msg.get)
            .then((response) => {

                console.log(response);

                if (response === undefined) {
                    sendMessage(msg.set)
                        .then(() => resolve());
                }
                else {
                    callback(response);
                    resolve(console.log('resolved'));
                }


            })

    });

}


function loadStatus() {

    const key = 'state';

    const msg = {
        get: message.get(key),
        set: message.set(key, false)
    };

    return requester(msg, toggleToggle);

}


function populateBookmarks(bookmarks) {

    const bookmark_list = document.getElementById('bookmark-list');

    bookmarks.forEach((bookmark) => {

        const html_string = `<li class="list-item">
            <div class="bookmark-node">
                <div class="bookmark-link-text">
                    <a href="${bookmark.bookmark_info.url}">
                        ${bookmark.bookmark_info.search_term}
                    </a>
                </div>
                <div class="bookmark-options">
                    <div class="bookmark-option">
                        <button id="info-show" class="info-pane-opener round-button">i</button>
                        <div class="info-pane" style="display: none;">
                            <div class="info-pane-header">
                                <button id="info-pane-close">x</button>
                                <span class="info-pane-header-text">Bookmark Information</span>
                            </div>
                            <div class="info-pane-content">
                                <ul class="content-list info-pane-list">
                                    <li class="list-item info-pane-item">
                                        <div class="info-pane-item-content">
                                            <div class="left-content">Exported on</div>
                                            <div class="right-content">
                                                ${bookmark.bookmark_info.search_date}
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-item info-pane-item">
                                        <div class="info-pane-item-content">
                                            <div class="left-content">Profitability</div>
                                            <div class="right-content">
                                                ${bookmark.score.profitability}
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-item info-pane-item">
                                        <div class="info-pane-item-content">
                                            <div class="left-content">Competition</div>
                                            <div class="right-content">
                                                ${bookmark.score.competition}
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-item info-pane-item">
                                        <div class="info-pane-item-content">
                                            <div class="left-content">Overall Score</div>
                                            <div class="right-content">
                                                ${bookmark.score.overa}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
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


function fetchData() {

    const key = 'bookmarks';

    const msg = {
        get: message.get(key),
        set: message.set(key, [])
    };

    return requester(msg, populateBookmarks);
}

function initialize() {

    loadStatus()
        .then(() => {
            fetchData()
                .then(() => {
                    allotListeners();
                });
        });

}

initialize();