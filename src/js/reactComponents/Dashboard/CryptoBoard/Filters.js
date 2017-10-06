import React from "react";

import Dropdown from "../../General/Dropdown";
import ButtonGroup from "../../General/ButtonGroup";

const Filters = props => (
    <section className="table-filters col-md-12 col-sm-12 col-xs-12">
        <div className="well dropdown-group">           
            <Dropdown classesCSS={{ dropdown: "dropdown_market-cap", button: "btn-success" }}
                      titleText="Market Cap"
                      options={[
                        { dataValue: "0", textValue: "All" },
                        { dataValue: "1", textValue: "$1 Billion+" },
                        { dataValue: "2", textValue: "$100 Million - $1 Billion" },
                        { dataValue: "3", textValue: "$10 Million - $100 Million" },
                        { dataValue: "4", textValue: "$1 Million - $10 Million" },
                        { dataValue: "5", textValue: "$100k - $1 Million" },
                        { dataValue: "6", textValue: "$0 - $100k" },
                      ]}
            />
            <Dropdown classesCSS={{ dropdown: "dropdown_price", button: "btn-success" }}
                      titleText="Price"
                      options={[
                        { dataValue: "0", textValue: "All" },
                        { dataValue: "1", textValue: "$100+" },
                        { dataValue: "2", textValue: "$1 - $100" },
                        { dataValue: "3", textValue: "$0.01 - $1" },
                        { dataValue: "4", textValue: "$0.0001 - $0.01" },
                        { dataValue: "5", textValue: "$0 - $0.0001" },
                      ]}
            />
            <Dropdown classesCSS={{ dropdown: "dropdown_volume-24h", button: "btn-success" }}
                      titleText="Volume(24 hours)"
                      options={[
                        { dataValue: "0", textValue: "All" },
                        { dataValue: "1", textValue: "$10 Million+" },
                        { dataValue: "2", textValue: "$1 Million+" },
                        { dataValue: "3", textValue: "$100k+" },
                        { dataValue: "4", textValue: "$10k+" },
                        { dataValue: "5", textValue: "$1k+" },
                      ]}
            />
            <button id="reset_dropdown-group" className="btn btn-danger">Reset</button>
        </div>
        <div className="well full_width">
            <Dropdown classesCSS={{ dropdown: "dropdown_table-currency", button: "btn-success" }}
                      titleText="Currency"
                      options={[
                        { dataValue: "USD" },
                        { dataValue: "EUR" },
                        { dataValue: "UAH" },
                        { dataValue: "RUB" },
                        { dataValue: "BTC" },
                        { dataValue: "LTC" },
                        { dataValue: "ETH" },
                      ]}
            />            
            <div className="table-length">
                <h4>Table Length</h4>
                <ButtonGroup classesCSS="btn-group"
                             buttons={[
                                 { attrs: { "data-value": "100" }, textValue: "Top 100" },
                                 { textValue: "All" }
                             ]}
                />
            </div>
        </div>
    </section>
);

export default Filters;