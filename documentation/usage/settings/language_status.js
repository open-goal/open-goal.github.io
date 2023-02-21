import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ReactPlayer from 'react-player';

const languageStatus = {
	'jak1': {
		'name': "Jak and Daxter: The Precursor Legacy",
		'languages': [
			{
				'name': "English",
				'audio?': true, 'text?': true, 'subs?': true
			},
			{
				'name': "English (UK)",
				'audio?': false, 'text?': true, 'subs?': false
			},
			{
				'name': "French",
				'nativeName': "Français",
				'audio?': true, 'text?': true, 'subs?': true
			},
			{
				'name': "German",
				'nativeName': "Deutsch",
				'audio?': true, 'text?': true, 'subs?': true
			},
			{
				'name': "Spanish",
				'nativeName': "Español",
				'audio?': true, 'text?': true, 'subs?': true
			},
			{
				'name': "Italian",
				'nativeName': "Italiano",
				'audio?': true, 'text?': 'partial', 'subs?': false
			},
			{
				'name': "Japanese",
				'nativeName': "にほんご",
				'audio?': true, 'text?': 'partial', 'subs?': false,
				'noteAudio': 1
			},
			/*{
				'name': "Portuguese",
				'nativeName': "Português",
				'audio?': false, 'text?': true, 'subs?': true
			},*/
			{
				'name': "Portuguese (Brazil)",
				'nativeName': "Português (Brasil)",
				'audio?': false, 'text?': false, 'subs?': true
			},
			{
				'name': "Hungarian",
				'nativeName': "Magyar",
				'audio?': false, 'text?': true, 'subs?': false
			}
		],
		'notes': [
			"If the game version provided to OpenGOAL is not the original NTSC-U release of The Precursor Legacy, sound effects will also be altered when this language is selected for audio."]
	}
}

function makeTableItemName(lang) {
	if (lang.nativeName === null || lang.name == lang.nativeName)
		return(<th>{lang.name}</th>);
	else
		return(<th>{lang.name}<br/>{lang.nativeName}</th>);
}

function makeTableItemBool(val, note_id = -1) {
	var notes = note_id != -1 && "*".repeat(note_id);
	if (val === 'partial')
		return(<td class="lang-maybe">Partial{notes}</td>);
	else if (val === 'invalid')
		return(<td>N/A{notes}</td>);
	else if (val === true)
		return(<td class="lang-yes">Yes{notes}</td>);
	else
		return(<td class="lang-no">No{notes}</td>);
}

function makeTableNotes(notes) {
	var index = 1;
	return(<div class="footnotes">{notes.map( note => {
		// todo : figure out how to get syntax highlighting here...
		return(<span>{"*".repeat(index++)} - {note}<br/></span>);
	})}</div>);
}

export default function LanguageStatusTable({game}) {
	return(<div class="language-table container">
	<tr><th>Language</th><th>Audio?</th><th>Text?</th><th>Subtitles?</th></tr>
	{ languageStatus[game].languages.map( lang => {
		return(<tr>{makeTableItemName(lang)}
		{makeTableItemBool(lang['audio?'], lang.noteAudio)}
		{makeTableItemBool(lang['text?'], lang.noteText)}
		{makeTableItemBool(lang['subs?'], lang.noteSubs)}
		</tr>)
		}) }
		{makeTableNotes(languageStatus[game].notes)}
	</div>)
}

