import React,{ Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      zipcode: ''
    },
    loading: false
  }
  orderHandler = (event) => {
    event.preventDefault();
    // console.log(this.props.ingredient);
    this.setState({loading: true});
    const order = {
      ingredient: this.props.ingredient,
      price: this.props.totalPrice,
      customer: {
        name: 'Sherry Li',
        address: {
          street: 'TestStreet 1',
          zipcode: '00000',
          country: 'US',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
        .then(response => {
          this.setState({loading: false})
          this.props.history.push('/');
        })
        .catch(error => {
          this.setState({loading: false})
        });
  }
  render(){
    let form = (
      <form>
        <input className={classes.Input} type='text' name='name' placeholder='Your Name:'/>
        <input className={classes.Input} type='text' name='phone' placeholder='Your Phone:'/>
        <input className={classes.Input} type='text' name='street' placeholder='Your Street:'/>
        <input className={classes.Input} type='text' name='zipcode' placeholder='Your Zipcode:'/>
        <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
      </form>
    );
    if(this.state.loading){
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;