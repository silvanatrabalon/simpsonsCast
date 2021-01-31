import { StyleSheet } from 'react-native';
import { theme } from './../../utils/theme';

const {
	typography: { fontFamily, fontSize },
	colors: { primary, neutral },
	sizes: { xSmall, small, medium },
} = theme;

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: primary['01'],
	},
	header: {
		paddingLeft: medium,
		marginTop: small,
		marginBottom: small
	},
	imageHeader: {
		position: 'absolute',
		marginTop: xSmall,
		marginLeft: xSmall,
	},
	textHeader: {
		fontSize: fontSize.small,
		fontWeight: 'bold',
		alignSelf: 'center'
	},
	caption: {
		fontSize: fontSize.small,
	},
	bottomDrawerSection: {
		borderTopColor: neutral['02'],
		borderTopWidth: 1
	},
});
