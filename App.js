import React, { Component } from 'react';
import {TouchableOpacity,View, Text, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements'
import Canvas from 'react-native-canvas';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      color: canvas.strokeColor,
      previousX: "", 
      previousY: "",
      currentX: "",
      currentY: "",
      drawFlag: false,
    };
    this.canvas = React.createRef();
    this.onTouch = this.onTouch.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  componentDidMount = () => {
    this.clearCanvas();
  }

  clearCanvas = () => {
    const ctx = this.canvas.current.getContext('2d');
    this.canvas.current.width = canvas.width;
    this.canvas.current.height = canvas.height;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = canvas.strokeColor;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Touch on display
   */
  onTouch = (e) => {
    this.setState({ drawFlag: true });
    this.setState({ previousX: e.nativeEvent.locationX });
    this.setState({ previousY: e.nativeEvent.locationY });
  }

  /**
   * Moving on display
   */
  onMove = (e) => {
    if(!this.state.drawFlag) return;

    const ctx = this.canvas.current.getContext('2d');
    ctx.beginPath();

    if (this.state.currentX === ''){
      this.setState({ currentX: this.state.previousX });
      this.setState({ currentY: this.state.previousY });
    } else {
      this.setState({ previousX: e.nativeEvent.locationX });
      this.setState({ previousY: e.nativeEvent.locationY });
      ctx.moveTo(this.state.previousX, this.state.previousY);
    }

    ctx.strokeStyle = this.state.color;
    ctx.lineTo(this.state.currentX, this.state.currentY);
    ctx.stroke();
    ctx.closePath();

    this.setState({ currentX: this.state.previousX});
    this.setState({ currentY: this.state.previousY});
  }

  /**
   * Touch end
   */
  onTouchEnd = () => {
    this.setState({ drawFlag: false });
    this.setState({ previousX: '' });
    this.setState({ previousY: '' });
    this.setState({ currentX: '' });
    this.setState({ currentY: '' });
  }

  render() {
    return (
        <View　style={styles.container}>
        <Text style={styles.title}>Draw app</Text>
          <View 
            style={{width: canvas.width, height: canvas.height}}
            onTouchStart = {this.onTouch}
            onTouchMove = {this.onMove}
            onTouchEnd = {this.onTouchEnd}>
            <Canvas ref={this.canvas}/>
          </View>
          
          <Text style={styles.paletteText}>文字色を変更／描画をリセット</Text>
          <View style={styles.paletteArea}>
            <Icon
              reverse
              name='pencil'
              type='font-awesome'
              color={canvas.strokeColor}
              onPress={() => this.setState({ color: canvas.strokeColor})}
            />
            <Icon
              reverse
              name='pencil'
              type='font-awesome'
              color='#317BFD'
              onPress={() => this.setState({ color: "#317BFD"})}
            />
            <Icon
              reverse
              name='pencil'
              type='font-awesome'
              color='#FF1500'
              onPress={() => this.setState({ color: "#FF1500"})}
            />
            <Icon
              reverse
              name='pencil'
              type='font-awesome'
              color='#FFBD00'
              onPress={() => this.setState({ color: "#FFBD00"})}
            />
            <Icon
              reverse
              name='eraser'
              type='font-awesome'
              color={canvas.strokeColor}
              onPress={this.clearCanvas}
            />
          </View>
      </View>
    );
  }
}

// stylesheet
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    color: '#235180',
    fontSize: 36,
    marginTop: 10,
    marginBottom: 10,
  },
  paletteText: {
    color : '#6D6D6D',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 24,
  },
  paletteArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: 300,
  },
});

// default values for canvas
const canvas = {
  width  : 300,
  height : 300,
  strokeColor : '#B6B6B6',
}
