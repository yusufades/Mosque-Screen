import React, { Component } from 'react';
import './jummah-times.css';
import moment from 'moment/moment';
import AppConfig from '../app-config/app-config';

class JummahTimes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _appConfig: new AppConfig()
    };
  }

  getDST() {
    return this.getNextFriday().isDST();
  }

  getNextFriday() {
    const dayINeed = 5;

    if (moment().isoWeekday() <= dayINeed) {
      return moment().isoWeekday(dayINeed);
    } else {
      return moment()
        .add(1, 'weeks')
        .isoWeekday(dayINeed);
    }
  }

  getJummahTimes() {
    const season = this.getDST() ? 'summer' : 'winter';
    const jummahNumbers =
      parseInt(this.state._appConfig.get('Jummah_slot_count')) ?? 0;
    return [...Array(jummahNumbers)]
      .map((_, i) =>
        this.state._appConfig.get(`Jummah_slot_${i + 1}_${season}`)
      )
      .filter(time => !!time);
  }

  getJummahLabels() {
    const jummahNumbers =
      parseInt(this.state._appConfig.get('Jummah_slot_count')) ?? 0;
    return [...Array(jummahNumbers)].map((_, i) =>
      this.state._appConfig.get(`Jummah_slot_${i + 1}_label`)
    );
  }

  render() {
    return (
      <div className="JummahTimesWrapper">
        <table className="JummahTimesTable">
          <thead>
            <tr>
              <th />
              {this.getJummahLabels().map((label, i) => (
                <th key={i}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jumu‘ah</td>
              {this.getJummahTimes().map((time, i) => (
                <td key={i}>{time}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default JummahTimes;
