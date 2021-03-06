var _           = require('../lib/lodash.custom'),
    React       = require('react'),
    configStore = require('../store/BgmConfigStore');

var BgmItemSub = React.createClass({
    propTypes: {
        data: React.PropTypes.object.isRequired,
        disableNewTab: React.PropTypes.bool,
        handleHideChange: React.PropTypes.func,
        handleHighlightChange: React.PropTypes.func,
        hide: React.PropTypes.bool,
        highlight: React.PropTypes.bool,
        isHistory: React.PropTypes.bool
    },
    getInitialState: function(){
        return {
            hideCheck: this.props.data.hide,
            highlightCheck: this.props.data.highlight
        };
    },
    handleHideClick: function(e){
        this.setState({
            hideCheck: e.target.checked
        });
        this.props.handleHideChange(e.target.checked);
    },
    handleHighlightClick: function(e){
        this.setState({
            highlightCheck: e.target.checked
        });
        this.props.handleHighlightChange(e.target.checked);
    },
    getDownloadSites: function(data){
        var downloadSites = {
            'dmhy': {
                name: '花园',
                prefix: 'http://share.dmhy.org/topics/list?keyword=',
                default: 'CN'
            },
            'popgo': {
                name: '漫游',
                prefix: 'http://share.popgo.org/search.php?title=',
                default: 'CN'
            },
            'nyaa': {
                name: 'Nyaa',
                prefix: 'http://www.nyaa.se/?page=search&term=',
                default: ['EN', 'JP']
            }
        };

        return _.map(downloadSites, function(conf, domain){
            var keyword = '';

            // 如果在数据中有覆盖选项，则直接使用
            if(data.downloadKeyword && data.downloadKeyword[domain]){
                keyword = data.downloadKeyword[domain];
            }else{
                if(typeof conf.default === 'string' && conf.default){
                    // 如果为字符串，则直接获取
                    keyword = data['title' + conf.default];
                }else if(_.isArray(conf.default)){
                    // 如为数组，则依优先级获取
                    _.each(conf.default, function(value, i){
                        if(data['title' + value]){
                            keyword = data['title' + value];
                            return false;
                        }
                    });
                }

                // 如果仍然没有值，则取中文标题
                if(!keyword){
                    keyword = data.titleCN;
                }
            }

            return (
                <a
                    key={domain}
                    href={encodeURI(decodeURI(conf.prefix + keyword))}
                    target={this.props.disableNewTab ? '_self' : '_blank'}
                >
                    {conf.name}
                </a>
            );
        }.bind(this));
    },
    render: function(){
        var data = this.props.data,
            comment = data.comment ? <p><span className="sub-title">备注：</span>{data.comment}</p> : <p></p>,
            bangumi = data.bgmId ? <a href={'http://bangumi.tv/subject/' + data.bgmId} target={this.props.disableNewTab ? '_self' : '_blank'}>Bangumi页面</a> : '',
            downloadSites = this.getDownloadSites(data);

        return (
            <div className="item-sub">
                <div className="sub-left">
                    <p className="sub-links">
                        <span className="sub-title">链接：</span>
                        <a
                            href={data.officalSite}
                            target={this.props.disableNewTab ? '_self' : '_blank'}
                        >
                            官方网站
                        </a>
                        {bangumi}
                    </p>
                    <p className="sub-links">
                        <span className="sub-title">下载：</span>
                        {downloadSites}
                    </p>
                </div>
                <div className="sub-middle">
                    <p>
                        <span className="sub-title">放送日期：</span>
                        {data.showDate}
                    </p>
                    {comment}
                </div>
                <div className={"sub-right" + (this.props.isHistory ? " hide" : "")}>
                    <p>
                        <input
                            type="checkbox"
                            checked={this.state.highlightCheck}
                            onChange={this.handleHighlightClick}
                            id={'highlight_' + data.id}
                        />
                        <label htmlFor={'highlight_' + data.id}>关注</label>
                    </p>
                    <p>
                        <input
                            type="checkbox"
                            checked={this.state.hideCheck}
                            onChange={this.handleHideClick}
                            id={'hide_' + data.id}
                        />
                        <label htmlFor={'hide_' + data.id}>隐藏</label>
                    </p>
                </div>
            </div>
        );
    }
});

module.exports = BgmItemSub;
