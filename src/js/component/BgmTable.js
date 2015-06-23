var React          = require('react'),
    configStore    = require('../store/BgmConfigStore'),
    TableSelector  = require('./TableSelector'),
    BgmList        = require('./BgmList'),
    BgmPreferences = require('./BgmPreferences');

var BgmTable = React.createClass({
    propTypes: {
        data: React.PropTypes.object,
        handleTabChange: React.PropTypes.func.isRequired,
        tab: React.PropTypes.number,
        keyword: React.PropTypes.string,
    },
    getInitialState: function(){
        return ({
            prefShow: false,
            tabName: '周天'
        });
    },
    togglePref: function(e){
        this.setState({
            prefShow: !this.state.prefShow
        });
    },
    handleTabChange: function(tabKey, tabName){
        this.props.handleTabChange(tabKey);
        this.setState({
            tabName: tabName
        });
    },
    render: function(){
        var props = this.props,
            state = this.state;

        return (
            <div className="main">
                <div className="inner table">
                    <div className="table-header">
                        <div className="table-left">
                            <a href="#" className="setting-btn" onClick={this.togglePref}>设置</a>
                        </div>
                        <div className="table-right">
                            <div className="table-header-info">
                                <div className="title">
                                    <label htmlFor="selectorToggle">{state.tabName}</label>
                                    <span>作品名</span>
                                </div>
                                <div className="time-jp">日本放送</div>
                                <div className="time-cn">
                                    <span className="m-hide">大陆放送</span>
                                    <span className="m-show">放送时间</span>
                                </div>
                                <div className="sites">
                                    放送站点
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-container">
                        <input id="selectorToggle" type="checkbox" className="toggle-input" />
                        <TableSelector
                            onTabChange={this.handleTabChange}
                            tab={props.tab}
                            isInSearch={!!props.keyword}
                        />
                        <BgmList
                            items={props.data}
                            tab={props.tab}
                            keyword={props.keyword}
                        />
                        <BgmPreferences
                            show={state.prefShow}
                            toggleHandler={this.togglePref}
                        />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = BgmTable;