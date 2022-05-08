import React from 'react'
import { AnimatedTabBarNavigator, DotSize, TabButtonLayout, TabElementDisplayOptions } from 'react-native-animated-nav-tab-bar'
import Icon from 'react-native-vector-icons/Feather'
import PrincipalClient from '../screens/Principal/PrincipalClient'
import Perfil from '../screens/Profile/Perfil'
import TrabajosEnCuso from '../screens/EnCurso/TrabajosEnCuso';
import Historial from '../screens/Historial/Historial';


const Tabs = AnimatedTabBarNavigator()

const TabBarIcon = (props: any) => {
	return (
		<Icon
			name={props.name}
			size={props.size ? props.size : 24}
			color={props.tintColor}
		/>
	)
}

const TabNavigate = () => (
	<Tabs.Navigator initialRouteName="Home"
		tabBarOptions={{
			activeTintColor: "#000",
			inactiveTintColor: "#407879",
			activeBackgroundColor: "#46D0D9",
			labelStyle: {
				fontSize: 15,
				fontWeight: "bold",
			},
		}}
		appearance={{
			shadow: true,
			floating: true,
			whenActiveShow: TabElementDisplayOptions.BOTH,
			dotSize: DotSize.MEDIUM,
			dotCornerRadius: 20,
			tabButtonLayout: TabButtonLayout.HORIZONTAL,
		}}
		// screenOptions={{
		// 	unmountOnBlur : true,
		// }}
	>
		<Tabs.Screen
			name="PrincipalClientes"
			component={PrincipalClient}
			options={{
				tabBarLabel: "Inicio",
				tabBarIcon: ({ focused, color }: any) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						name="home"
					/>
				),

			}}
		/>
		<Tabs.Screen
			name="Perfil"
			component={Perfil}
			options={{
				tabBarIcon: ({ focused, color }: any) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						name="user"
					/>
				),
				unmountOnBlur : true
			}}
		/>
		<Tabs.Screen
			name="En Curso"
			component={TrabajosEnCuso}
			options={{
				tabBarIcon: ({ focused, color }: any) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						name="clock"
					/>
				),
			}}
		/>
		<Tabs.Screen
			name="Historial"
			component={Historial}
			options={{
				tabBarIcon: ({ focused, color }: any) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						name="book"
					/>
				),
			}}
		/>
	</Tabs.Navigator>
)

export default TabNavigate