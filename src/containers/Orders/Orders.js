import React, { Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount () {
    this.props.onFetchOrders();
  }
  render (){
    let order = <Spinner />
    if(this.props.orders){
      order = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredient={order.ingredient}
          price={+order.price}/>
      ));
    }
    return (
      <div>
        {order}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    orders: state.order.orders,
    loading: state.order.loading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));
