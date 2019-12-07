import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import firebase from './firebase/firebase';

const { width } = Dimensions.get('screen');

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: ''
    }
  }



  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
          <Card item={{title: 'Área da Piscina',
            image: 'https://odis.homeaway.com/odis/listing/a5e6710d-5ec3-45bc-8b80-b1886a3a7089.c10.jpg',
            cta: 'Acessar Local', 
            horizontal: true
            }} horizontal
          />
          <Block flex row>
            <Card item={{title: 'LUGAR: Área da Piscina',
            image: 'https://odis.homeaway.com/odis/listing/a5e6710d-5ec3-45bc-8b80-b1886a3a7089.c10.jpg',
            cta: 'Acessar Local', 
            horizontal: true
            }} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block>
          <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full />
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Home;
