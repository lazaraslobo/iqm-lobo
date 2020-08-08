import React from 'react';
import {Dispatch, AnyAction} from 'redux'
import {RootState} from '../../core/redux/reducer';
import { connect } from 'react-redux';
import fetchAPI from '../../core/api-service';
import {HomeActions} from '../../core/redux/action.map';
import {Wrapper} from './Home.styled';
import {QuestionAnswerCard, QAcompPropsInterface} from '../re-usables/question-answer-card';
import {options} from '../Grid'
import {Grid} from '@material-ui/core';

type HocProps = ReturnType<typeof mapStateToProps & typeof mapDispatchToProps>;

const FetchApiLoading = () => <h1>Fetching Stack API .... </h1>

class HomeComponent extends React.Component<any, any>{
  constructor(props : any){
    super(props);
  }
  componentDidMount(){
    this.props.getHomeScreenData();
  };
  render(){
    return(
      <Wrapper>
        <Grid {...options.contRowCenterStart}>
          <Grid item xs={12} sm={12} lg={10} md={10} xl={10}>
            {
              !this.props.HomeData.data.length ?
                <FetchApiLoading />
              :
                <Grid {...options.contRowCenterStart}>
                {
                  this.props.HomeData.data.map((eachQA : QAcompPropsInterface, index : number ) => (
                    <Grid key={index} item xs={12} sm={12} lg={6} md={6} xl={6}>
                      <QuestionAnswerCard {...eachQA}/>
                    </Grid>
                  ))
                }
                </Grid>
            }
          </Grid>
        </Grid>
      </Wrapper>)
    }
}

const mapStateToProps = (state: RootState) => ({
    HomeData  : state.HOME_STATE,
});

const mapDispatchToProps = (dispatch : Dispatch<AnyAction>) =>({
    getHomeScreenData   :  () => fetchQuestionAnswers(dispatch)//dispatch({data : {test : "test"}, type : HomeActions.setQuestionAnswers})
});

const fetchQuestionAnswers = (dispatch : Dispatch<AnyAction>) =>{
  return fetchAPI().then(data =>{
    dispatch({type : HomeActions.setQuestionAnswers, data : data});
    return data;
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);