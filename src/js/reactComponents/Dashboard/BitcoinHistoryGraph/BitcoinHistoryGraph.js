import React from "react";


// COMPONENTS
import Header from "../../General/Header";
import Dropdown from "../../General/Dropdown";
import CalendarForm from "../../General/CalendarForm";
import ButtonGroup from "../../General/ButtonGroup";
import LineChart from "./LineChart";

// HELPER FUNCTIONS
import { formProperDateFormat, createDateObj } from '../../../helperFunctions';

class BitcoinHistoryGraph extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    const display = this.props.display;
    const componentToUpdate = 'BitcoinHistoryGraph';
    this.props.update(this.createURL(), display, componentToUpdate)
    .then(() => this.renderGraph(false));
  }
  createURL() {
    const { start, end, currency } = this.props.model.filters;
    const url = this.props.model.url;
    return url + `?start=${start}&end=${end}&currency=${currency}`;
  }
  renderGraph(componentIsUpdated) {
    if(!this.props.model.data) return;
       // transforms a string into a Date object      
      // create an array(dataset) from an object(data)
      const dataset = [];
      const data = this.props.model.data.bpi;
      const keys = Object.keys(data);      
      keys.forEach(key => {
          dataset.push({
              time: createDateObj(key),
              currencyValue: data[key]
          });
      });     
     
      if(componentIsUpdated) this.chart.updateLine(dataset);
      else this.chart.buildLine(dataset);
  }
  timelineFilterChange(target) {
    const btnValue = target.getAttribute("data-timeline"); // button value
    const today = new Date(); // endDate
    const startDate = new Date();
    let timeline; // each of 6 buttons fall under 3 periods   
  
    switch(btnValue) {
      case "all-time":
        startDate.setFullYear(2010);
        startDate.setMonth(7);
        startDate.setDate(17);
        timeline = "from-all-time-to-year";
        break;
      case "1-year":
        startDate.setFullYear(startDate.getFullYear() - 1)
        timeline = "from-year-to-3-month";
        break;
      case "6-month":
        startDate.setMonth(startDate.getMonth() - 6)
        timeline = "from-year-to-3-month";
        break;
      case "3-month":
        startDate.setMonth(startDate.getMonth() - 3)
        timeline = "less-than-3-month";
        break;
      case "1-month":      
        startDate.setMonth(startDate.getMonth() - 1)
        timeline ="less-than-3-month";
        break;
      case "1-week":
        startDate.setDate(startDate.getDate() - 7);
        timeline ="less-than-3-month";
        break;
      default:
        console.warn("unknown timeline: ", btnValue);
    }

    const filterNames = [ "currentTimeline", "end", "start" ];
    const newFilterValues = [
      timeline,
      formProperDateFormat(today.getFullYear(), today.getMonth() + 1, today.getDate()),
      formProperDateFormat(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate())
    ];
    const componentToUpdate = "BitcoinHistoryGraph";

    this.props.change(newFilterValues, filterNames, componentToUpdate);
    this.props.update(this.createURL(), this.props.display, componentToUpdate)
      .then(() => this.renderGraph(true));
  }
  currencyFilterChange(target) {
    const newFilterValue = target.getAttribute("data-value");
    const display = this.props.display;
    const componentToUpdate = "BitcoinHistoryGraph";
    const filterName = "currency";

    this.props.change(newFilterValue, filterName, componentToUpdate)
    this.props.update(this.createURL(), this.props.display, componentToUpdate)
      .then(() => this.renderGraph(true));
  }
  render() {
    return (
        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <section id="history" className="row x_panel">
                <Header classesCSS="col-md-12 col-sm-12 col-xs-12 x_title"
                        titleText="Bitcoin History"
                />
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <Dropdown onClickHandler={this.currencyFilterChange.bind(this)}
                              classesCSS={{
                                  container: "well",
                                  button: "btn-success"
                              }}
                              titleText="Currency"
                              defaultDataValue={this.props.model.filters.currency}
                              options={[
                                  { dataValue: "USD" },
                                  { dataValue: "EUR" },
                                  { dataValue: "RUB" },
                                  { dataValue: "UAH" },
                              ]}
                    />
                    <div className="well" style={{ "overflow" : "auto"}}>
                        <CalendarForm name="start" id="start"
                                      start={this.props.model.filters.start}
                                      end={this.props.model.filters.end}
                                      change={this.props.change}
                                      update={this.props.update}
                                      createURL={this.createURL.bind(this)}
                                      renderGraph={this.renderGraph.bind(this)}/>
                        <CalendarForm name="end" id="end"
                                      start={this.props.model.filters.start}
                                      end={this.props.model.filters.end}
                                      change={this.props.change}
                                      update={this.props.update}
                                      createURL={this.createURL.bind(this)}
                                      renderGraph={this.renderGraph.bind(this)}/>
                    </div>
                    <ButtonGroup onClickHandler={this.timelineFilterChange.bind(this)}
                                 classesCSS="well btn-group full-width"                                 
                                 buttons={[
                                   { attrs: { "data-timeline": "all-time" },
                                     classesCSS:"btn-success",
                                     textValue: "All time"
                                   },
                                   { attrs: { "data-timeline": "1-year" },
                                     classesCSS: "btn-success",
                                     textValue: "Year"
                                   },
                                   { attrs: { "data-timeline": "6-month" },
                                     classesCSS: "btn-success",
                                     textValue: "6 months"
                                   },
                                   { attrs: { "data-timeline": "3-month" },
                                     classesCSS: "btn-success",
                                     textValue: "3 months"
                                   },
                                   { attrs: { "data-timeline": "1-month" },
                                     classesCSS: "btn-success active",
                                     textValue: "1 month"
                                   },
                                   { attrs: { "data-timeline": "1-week" },
                                     classesCSS: "btn-success",
                                     textValue: "week"
                                    },
                                 ]}
                    />
                </div>
                <LineChart ref={lineChart => this.chart = lineChart} 
                           model={this.props.model}
                           signs={this.props.signs}
                />
            </section>
        </div>
    );
  }
}
    
export default BitcoinHistoryGraph;