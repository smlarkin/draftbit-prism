%raw(`require("./PropertiesPanel.css")`)

module Collapsible = {
  @react.component
  let make = (~title, ~children) => {
    let (collapsed, toggle) = React.useState(() => false)

    <section className="Collapsible">
      <button className="Collapsible-button" onClick={_e => toggle(_ => !collapsed)}>
        {React.string(title)}
      </button>
      <div className="Collapsible-content"> {collapsed ? React.null : children} </div>
    </section>
  }
}

@genType.as("PropertiesPanel")
@react.component
export make = () =>
  <aside className="PropertiesPanel">
    <Collapsible title="Layout"> <span> {React.string("example")} </span> </Collapsible>
    <Collapsible title="Margins & Padding">
      <span> {React.string("TODO: build me!")} </span>
    </Collapsible>
    <Collapsible title="Size"> <span> {React.string("example")} </span> </Collapsible>
  </aside>
