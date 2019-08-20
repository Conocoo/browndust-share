/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import './Mercenary.scss';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { set } from '../service/Session';
import { getThumbnailUrlByImageName } from '../utils';

class Mercenary extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  /**
   * DrageStart Event
   * sid source position id
   * scode source position image code
   */
  onDragStart = (ev, scode, sid) => {
    ev.dataTransfer.setData('scode', scode);
    ev.dataTransfer.setData('sid', sid);
  }

  onDoubleClick = () => {
    console.log('db click');
  }

  getCharNameByLocale = (locale = 'US', params = null) => {
    if (_.isNull(params)) return;

    const { _charName, _charName_ENG, _charName_TW, _charName_JAP } = params;
    switch (locale) {
      case 'US': return _charName_ENG;
      case 'TW': return _charName_TW;
      case 'CN': return _charName_TW;
      case 'KR': return _charName;
      case 'JP': return _charName_JAP;
      default: return _charName_ENG;
    }
  }

  render() {
    const { _uiIconImageName, _code } = this.props.params;
    const formation = this.props.dataset.formation;
    const nops = this.props.nameOptions.map(n => n.checked);
    const URL = getThumbnailUrlByImageName(_uiIconImageName);
    const opacity = _.isUndefined(formation.find(f => f.code === _code))
      ? 1 : 0.2;

    return (
      <div
        className={`mercenary ${nops[0] ? 'show' : ''} ${nops[1] ? 'bold' : ''}`}
        style={{ backgroundImage: `url(${URL})`, opacity }}
        data-tooltip={this.getCharNameByLocale(this.props.settings.locale, this.props.params)}
        draggable
        onClick={() => set('_code', _code)}
        onDragStart={(e) => this.onDragStart(e, _code, 0)}
        onDoubleClick={() => this.onDoubleClick()}
      >
      </div>
    );
  }
}

Mercenary.propTypes = {
  nameOptions: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    settings: state.settings,
    dataset: state.dataset,
  }
}

export default connect(mapStateToProps)(Mercenary);
