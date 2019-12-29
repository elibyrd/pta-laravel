import React from "react"

/* 
 * Component which serves the purpose of a "root route component". 
 */
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  /**
   * Here, we define a react lifecycle method that gets executed each time 
   * our component is mounted to the DOM, which is exactly what we want in this case
   */
  componentDidMount() {
    document.title = this.props.title;
    this.setState({title: this.props.title});
  }

  /**
   * Here, we use a component prop to render 
   * a component, as specified in route configuration
   */
  render() {
    const PageComponent = this.props.component

    return (
      <div className='l-content'>
        <header className='l-header'>
          <div className='h-hamburger mobile-only' onClick={this.props.menuClick}><i className="fas fa-bars"></i><span className='sr-only'>Menu</span></div>
          <div className='h-title'>{this.state.title}</div>
        </header>
        <main className='l-main'>
        <PageComponent history={this.props.history} match={this.props.match} />
        </main>
      </div>
    )
  }
}

export default Page