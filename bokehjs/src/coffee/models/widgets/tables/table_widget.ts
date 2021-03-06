import {Widget} from "../widget";
import {ColumnarDataSource} from "../../sources/columnar_data_source";
import {CDSView} from "../../sources/cds_view";
import * as p from "core/properties"

export namespace TableWidget {
  export interface Attrs extends Widget.Attrs {
    source: ColumnarDataSource
    view: CDSView
  }

  export interface Opts extends Widget.Opts {}
}

export interface TableWidget extends TableWidget.Attrs {}

export class TableWidget extends Widget {

  constructor(attrs?: Partial<TableWidget.Attrs>, opts?: TableWidget.Opts) {
    super(attrs, opts)
  }

  static initClass(): void {
    this.prototype.type = "TableWidget";

    this.define({
      source: [ p.Instance ],
      view:   [ p.Instance, () => new CDSView() ],
    });
  }

  initialize(): void {
    super.initialize();

    if (this.view.source == null) {
      this.view.source = this.source;
      this.view.compute_indices();
    }
  }
}
TableWidget.initClass();
