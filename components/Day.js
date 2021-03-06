import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

import styles from './styles';

export default class Day extends Component {
	static defaultProps = {
		customStyle: {},
	}

	static propTypes = {
		caption: PropTypes.string,
		customStyle: PropTypes.shape({}),
		filler: PropTypes.bool,
		event: PropTypes.PropTypes.shape({}),
		isSelected: PropTypes.bool,
		isToday: PropTypes.bool,
		isWeekend: PropTypes.bool,
		onPress: PropTypes.func,
		renderEvent: PropTypes.func,
		showEventIndicators: PropTypes.bool,
	}

	dayCircleStyle = (isWeekend, isSelected, isToday, event) => {
		const {customStyle} = this.props;
		const dayCircleStyle = [styles.dayCircleFiller, customStyle.dayCircleFiller];

		if (isSelected) {
			if (isToday) {
				dayCircleStyle.push(styles.currentDayCircle, customStyle.currentDayCircle);
			} else {
				dayCircleStyle.push(styles.selectedDayCircle, customStyle.selectedDayCircle);
			}
		}

		if (event) {
			if (isSelected) {
				dayCircleStyle.push(styles.hasEventDaySelectedCircle, customStyle.hasEventDaySelectedCircle, event.hasEventDaySelectedCircle);
			} else {
				dayCircleStyle.push(styles.hasEventCircle, customStyle.hasEventCircle, event.hasEventCircle);
			}
		}
		return dayCircleStyle;
	}

	dayTextStyle = (isWeekend, isSelected, isToday, event) => {
		const {customStyle} = this.props;
		const dayTextStyle = [styles.day, customStyle.day];

		if (isToday && !isSelected) {
			dayTextStyle.push(styles.currentDayText, customStyle.currentDayText);
		} else if (isToday || isSelected) {
			dayTextStyle.push(styles.selectedDayText, customStyle.selectedDayText);
		} else if (isWeekend) {
			dayTextStyle.push(styles.weekendDayText, customStyle.weekendDayText);
		}

		if (event) {
			dayTextStyle.push(styles.hasEventText, customStyle.hasEventText, event.hasEventText)
		}
		return dayTextStyle;
	}

	renderEvents(customStyle, event) {
		if (this.props.renderEvent) {
			return this.props.renderEvent(event);
		}
		else {
			return <View style={[
				styles.eventIndicatorFiller,
				customStyle.eventIndicatorFiller,
				event && styles.eventIndicator,
				event && customStyle.eventIndicator,
				event && event.eventIndicator]}
			/>
		}
	}

	renderDayText(isWeekend, isSelected, isToday, event, caption) {
		if (this.props.renderDayText) {
			return this.props.renderDayText(isWeekend, isSelected, isToday, event, caption);
		}
		else {
			return <Text style={this.dayTextStyle(isWeekend, isSelected, isToday, event)}>{caption}</Text>
		}
	}

	render() {
		let {caption, customStyle} = this.props;
		const {
			filler,
			event,
			isWeekend,
			isSelected,
			isToday,
			showEventIndicators,
		} = this.props;

		return filler
			? (
				<TouchableWithoutFeedback>
					<View style={[styles.dayButtonFiller, customStyle.dayButtonFiller]}>
						<Text style={[styles.day, customStyle.day]}/>
					</View>
				</TouchableWithoutFeedback>
			)
			: (
				<TouchableOpacity onPress={this.props.onPress}>
					<View style={[styles.dayButton, customStyle.dayButton, isWeekend ? [styles.weekendDayButton, customStyle.weekendDayButton] : null]}>
						<View style={this.dayCircleStyle(isWeekend, isSelected, isToday, event)}>
							{this.renderDayText(isWeekend, isSelected, isToday, event, caption)}
						</View>
						{showEventIndicators && event && this.renderEvents(customStyle, event)}
					</View>
				</TouchableOpacity>
			);
	}
}