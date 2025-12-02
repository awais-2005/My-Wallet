/* eslint-disable react/no-unstable-nested-components */
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Chart from '../../components/Chart'
import { TransactionContext } from '../context/TransactionContext'



const AnalysisScreen = ({ navigation }) => {

    const context = useContext(TransactionContext);

    const [months, setMonths] = useState([]);

    const years = [...Object.keys(context.yearAndMonths).map(k => Number(k))];

    const [activeType, setActiveType] = useState('monthly');
    const [activeMonth, setActiveMonth] = useState('');
    const [activeYear, setActiveYear] = useState(years.length > 0 ? years[years.length - 1] : null);
    const [showMonth, setShowMonth] = useState(false);
    const [showYear, setShowYear] = useState(true);
    const [yearData, setYearData] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [weekData, setWeekData] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!activeYear || activeType !== 'monthly') return;
        setYearData(context.getDataOfYear(String(activeYear), setData));
    }, [context, activeYear, activeType]);

    useEffect(() => {
        if (!activeMonth || !activeYear || activeType !== 'daily') return;
        setDailyData(context.getDataOfDays(activeMonth, String(activeYear), setData));
    }, [context, activeMonth, activeYear, activeType]);

    useEffect(() => {
        if (!activeMonth || !activeYear || activeType !== 'weekly') return;
        setWeekData(context.getDataOfWeeks(activeMonth, String(activeYear), setData));
    }, [context, activeMonth, activeYear, activeType]);

    const Button = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} style={[styles.button, activeMonth === item || activeYear === item ? styles.activeButton : {}]} onPress={() => {

                if (typeof (item) !== 'number') {
                    setActiveMonth(item);
                }
                else {
                    setActiveYear(item);
                    if(activeType !== 'monthly') {
                        setShowMonth(true);
                        setMonths(context.yearAndMonths[String(item)] || []);
                    }
                }

                if (activeType && activeMonth) {
                    if (activeType === 'monthly') {
                        setData(yearData);
                    }
                    else if (activeType === 'weekly') {
                        setData(weekData);
                    } else {
                        if (activeMonth) {
                            setData(dailyData);
                        }
                    }
                }
            }}>
                <Text style={[styles.buttonText, activeMonth === item || activeYear === item ? styles.activeButtonText : {}]}>{item}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.main}>
            <Navbar navigation={navigation} screenTitle={'Statistics'} />
            <ScrollView>
                <Text style={styles.adjustChart}>Adjust Chart</Text>
                <View style={styles.analysisTypeContainer}>
                    <TouchableOpacity style={[styles.button, activeType === 'daily' ? styles.activeButton : {}]} onPress={() => {
                        setActiveType('daily');
                        if (activeYear) {
                            setMonths(context.yearAndMonths[String(activeYear)] || []);
                            setShowMonth(true);
                            !activeMonth && setData('Please select month');
                        }
                    }}>
                        <Text style={[styles.buttonText, activeType === 'daily' ? styles.activeButtonText : {}]}>Daily</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, activeType === 'weekly' ? styles.activeButton : {}]} onPress={() => {
                        setActiveType('weekly');
                        if (activeYear) {
                            setMonths(context.yearAndMonths[String(activeYear)] || []);
                            setShowMonth(true);
                            !activeMonth && setData('Please select month');
                        }
                    }}>
                        <Text style={[styles.buttonText, activeType === 'weekly' ? styles.activeButtonText : {}]}>Weekly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, activeType === 'monthly' ? styles.activeButton : {}]} onPress={() => {
                        setActiveType('monthly')
                        setShowMonth(false);
                        setShowYear(true);
                    }}>
                        <Text style={[styles.buttonText, activeType === 'monthly' ? styles.activeButtonText : {}]}>Monthly</Text>
                    </TouchableOpacity>
                </View>
                {showYear && (<FlatList
                    horizontal={true}
                    renderItem={Button}
                    data={years}
                    style={styles.buttonsFlatList}
                    contentContainerStyle={styles.flatListContentContainer}
                    showsHorizontalScrollIndicator={false}
                />)}
                {showMonth && (<FlatList
                    horizontal={true}
                    renderItem={Button}
                    data={months}
                    style={styles.buttonsFlatList}
                    contentContainerStyle={styles.flatListContentContainer}
                    showsHorizontalScrollIndicator={false}
                />)}
                <View style={styles.chart} >
                    <Chart data={data} />
                </View>
            </ScrollView>
        </View>
    )
}

export default AnalysisScreen

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
    },
    chart: {
        marginTop: 15,
    },
    adjustChart: {
        fontSize: 17,
        marginLeft: '5%',
        marginTop: 30,
        color: '#303030',
        fontWeight: '900',
        transform: [{scaleY: 1.35}]
    },
    analysisTypeContainer: {
        width: '90%',
        marginLeft: '5%',
        marginTop: 10,
        gap: 5,
        flexDirection: 'row',
    },
    buttonsFlatList: {
        width: '90%',
        marginLeft: '5%',
        maxHeight: 35,
        marginTop: 10,
    },
    flatListContentContainer: {
        gap: 5,
    },
    button: {
        height: 35,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: '#368489',
        borderWidth: 2,
        borderRadius: 7,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#368489',
        fontSize: 13,
    },
    activeButton: {
        backgroundColor: '#368489',
    },
    activeButtonText: {
        color: '#fff',
    },
})