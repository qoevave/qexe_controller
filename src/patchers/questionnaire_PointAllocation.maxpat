{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 0,
			"revision" : 3,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 937.0, 334.0, 1328.0, 851.0 ],
		"bglocked" : 0,
		"openinpresentation" : 1,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "methodP910",
		"tags" : "methodP910",
		"style" : "QExELookAndFeel",
		"subpatcher_template" : "",
		"globalpatchername" : "methodP910[1][1][1][1][1][1][1][1][1][1][1][1][1]",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-83",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 74.0, 411.5, 58.0, 22.0 ],
					"text" : "loadbang"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-81",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 398.0, 673.5, 291.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-78",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 74.0, 451.5, 82.0, 22.0 ],
					"text" : "WriteResult 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-76",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 74.0, 524.0, 149.0, 22.0 ],
					"text" : "prepend SetCurrentRating"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.219607843137255, 0.219607843137255, 0.219607843137255, 1.0 ],
					"fontsize" : 10.0,
					"id" : "obj-66",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1186.500011920928955, 436.5, 49.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 422.452423095703125, 442.7418212890625, 38.705883026123047, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.219607843137255, 0.219607843137255, 0.219607843137255, 1.0 ],
					"fontsize" : 10.0,
					"id" : "obj-68",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1176.000011920928955, 411.5, 49.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 422.452423095703125, 417.859466552734375, 38.705883026123047, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.219607843137255, 0.219607843137255, 0.219607843137255, 1.0 ],
					"fontsize" : 10.0,
					"id" : "obj-32",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1165.5, 515.0, 49.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 422.452423095703125, 391.016326904296875, 38.705883026123047, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.219607843137255, 0.219607843137255, 0.219607843137255, 1.0 ],
					"fontsize" : 10.0,
					"id" : "obj-35",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1155.0, 489.5, 49.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 422.452423095703125, 367.28759765625, 38.705883026123047, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.219607843137255, 0.219607843137255, 0.219607843137255, 1.0 ],
					"fontsize" : 10.0,
					"id" : "obj-43",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1144.5, 465.0, 49.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 422.452423095703125, 341.75164794921875, 38.705883026123047, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.219607843137255, 0.219607843137255, 0.219607843137255, 1.0 ],
					"fontsize" : 10.0,
					"id" : "obj-44",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1134.0, 440.0, 49.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 422.452423095703125, 315.562103271484375, 38.705883026123047, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.219607843137255, 0.219607843137255, 0.219607843137255, 1.0 ],
					"fontsize" : 10.0,
					"id" : "obj-45",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1123.5, 415.0, 49.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 422.452423095703125, 291.333343505859375, 38.705883026123047, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.219607843137255, 0.219607843137255, 0.219607843137255, 1.0 ],
					"fontsize" : 10.0,
					"id" : "obj-31",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1113.0, 515.0, 49.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 422.452423095703125, 265.797393798828125, 38.705883026123047, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.219607843137255, 0.219607843137255, 0.219607843137255, 1.0 ],
					"fontsize" : 10.0,
					"id" : "obj-21",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1102.5, 489.5, 49.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 422.452423095703125, 240.261444091796875, 38.705883026123047, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.219607843137255, 0.219607843137255, 0.219607843137255, 1.0 ],
					"fontsize" : 10.0,
					"id" : "obj-10",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1092.0, 465.0, 49.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 422.452423095703125, 216.032684326171875, 38.705883026123047, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.219607843137255, 0.219607843137255, 0.219607843137255, 1.0 ],
					"fontsize" : 10.0,
					"id" : "obj-9",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1081.5, 440.0, 49.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 422.452423095703125, 190.8431396484375, 38.705883026123047, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.219607843137255, 0.219607843137255, 0.219607843137255, 1.0 ],
					"fontsize" : 10.0,
					"id" : "obj-6",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1071.0, 415.0, 49.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 422.452423095703125, 165.960784912109375, 38.705883026123047, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 12,
					"outlettype" : [ "int", "int", "int", "int", "int", "int", "int", "int", "int", "int", "int", "int" ],
					"patching_rect" : [ 1071.0, 383.0, 134.5, 22.0 ],
					"text" : "unpack i i i i i i i i i i i i"
				}

			}
, 			{
				"box" : 				{
					"color" : [ 0.211764705882353, 0.568627450980392, 0.588235294117647, 1.0 ],
					"id" : "obj-3",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 736.5, 9.0, 104.0, 22.0 ],
					"text" : "receive osc_in_all"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-63",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 46.0, 571.5, 179.0, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "questionnaire_PointAllocation",
						"parameter_enable" : 0
					}
,
					"text" : "js questionnaire_PointAllocation"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-58",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 786.3125, 191.0, 46.0, 35.0 ],
					"text" : "select 12 $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-57",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 730.375, 191.0, 45.0, 35.0 ],
					"text" : "select 11 $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-56",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 674.4375, 191.0, 46.0, 35.0 ],
					"text" : "select 10 $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-55",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 618.5, 191.0, 43.0, 35.0 ],
					"text" : "select 9 $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-54",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 562.5625, 191.0, 43.0, 35.0 ],
					"text" : "select 8 $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-53",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 506.625, 191.0, 43.0, 35.0 ],
					"text" : "select 7 $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-52",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 450.6875, 191.0, 43.0, 35.0 ],
					"text" : "select 6 $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-51",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 394.75, 191.0, 43.0, 35.0 ],
					"text" : "select 5 $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-50",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 338.8125, 191.0, 43.0, 35.0 ],
					"text" : "select 4 $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-49",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 282.875, 191.0, 43.0, 35.0 ],
					"text" : "select 3 $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-48",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 226.9375, 191.0, 43.0, 35.0 ],
					"text" : "select 2 $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-47",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 171.0, 191.0, 43.0, 35.0 ],
					"text" : "select 1 $1"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"id" : "obj-12",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 963.0, 635.666662752628326, 18.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 160.106491088867188, 467.0726318359375, 18.0, 20.0 ],
					"text" : "|",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"id" : "obj-23",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1038.0, 635.666662752628326, 18.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 232.941619873046875, 467.0726318359375, 18.0, 20.0 ],
					"text" : "|",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"textjustification" : 1,
					"varname" : "label0"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"id" : "obj-25",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1113.0, 635.666662752628326, 18.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 309.505706787109375, 467.0, 18.0, 20.0 ],
					"text" : "|",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"textjustification" : 1,
					"varname" : "label2"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"id" : "obj-29",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1188.156681001186371, 635.666662752628326, 18.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 386.5, 467.0, 18.0, 20.0 ],
					"text" : "|",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"textjustification" : 1,
					"varname" : "label4"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-403",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 956.16668701171875, 657.66668701171875, 49.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 149.929824829101563, 490.5, 41.0, 28.0 ],
					"text" : "Low",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Poppins",
					"id" : "obj-400",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1176.0, 657.66668701171875, 61.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 371.0, 490.4273681640625, 49.0, 28.0 ],
					"text" : "High",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"textjustification" : 1,
					"varname" : "label5"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-42",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 660.0, 778.4000244140625, 127.0, 24.0 ],
					"text" : "Burping",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[19]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-41",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 660.0, 758.4000244140625, 127.0, 24.0 ],
					"text" : "Stomach awareness",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[18]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-38",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 660.0, 738.4000244140625, 127.0, 24.0 ],
					"text" : "Vertigo",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[17]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-37",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 660.0, 718.4000244140625, 127.0, 24.0 ],
					"text" : "Dizziness (eyes closed)",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[16]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-36",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 804.0, 608.0, 126.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 38.529411315917969, 439.5, 127.470588684082031, 24.0 ],
					"text" : "Att. 12",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[15]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-33",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 804.0, 588.0, 131.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 33.529411315917969, 416.5, 132.4705810546875, 24.0 ],
					"text" : "Att. 11",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[14]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-30",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 804.0, 568.0, 129.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 35.529411315917969, 391.630706787109375, 130.4705810546875, 24.0 ],
					"text" : "Att. 10",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[13]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-28",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 804.0, 548.0, 137.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 27.529411315917969, 366.748382568359375, 138.4705810546875, 24.0 ],
					"text" : "Att. 9",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[12]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-24",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 804.0, 529.5, 133.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 31.529411315917969, 341.058837890625, 134.4705810546875, 24.0 ],
					"text" : "Att. 8",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[11]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-22",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 804.0, 509.5, 134.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 30.529411315917969, 315.2156982421875, 135.4705810546875, 24.0 ],
					"text" : "Att. 7",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[10]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-19",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 804.0, 489.5, 134.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 30.529411315917969, 290.333343505859375, 135.4705810546875, 24.0 ],
					"text" : "Att. 6",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[9]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-18",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 804.0, 469.5, 134.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 30.529411315917969, 265.104583740234375, 135.4705810546875, 24.0 ],
					"text" : "Att. 5",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[8]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-17",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 804.0, 451.5, 129.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 35.529411315917969, 239.9150390625, 130.4705810546875, 24.0 ],
					"text" : "Att. 4",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[7]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-15",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 804.0, 431.5, 136.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 28.529411315917969, 216.348480224609375, 137.4705810546875, 24.0 ],
					"text" : "Att. 3",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[6]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-14",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 804.0, 411.5, 132.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 32.529411315917969, 190.803924560546875, 133.4705810546875, 24.0 ],
					"text" : "Att. 2",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[5]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-13",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 804.0, 392.5, 135.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 29.529411315917969, 165.267974853515625, 136.4705810546875, 24.0 ],
					"text" : "Att. 1",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[4]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.2, 0.2, 0.2, 0.0 ],
					"candycane" : 16,
					"contdata" : 1,
					"ghostbar" : 65,
					"id" : "obj-7",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"orientation" : 0,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 952.0, 383.0, 85.0, 102.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 167.0, 162.0, 231.0, 305.0 ],
					"setminmax" : [ 0.0, 11.0 ],
					"settype" : 0,
					"size" : 12,
					"spacing" : 4,
					"thickness" : 4,
					"varname" : "Sliders"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-27",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 602.0, 9.0, 124.0, 20.0 ],
					"text" : "From incoming OSC. "
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-26",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 79.5, 9.0, 253.0, 33.0 ],
					"text" : "from testmanager.js. Requirements must include a 'writeResult' and 'setItem' message. "
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-40",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 33.0, 750.399999999999977, 80.0, 33.0 ],
					"text" : "Extra output if needed. "
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-39",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 183.5, 750.399999999999977, 121.0, 20.0 ],
					"text" : "Sent to resultsWriter."
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.301961, 0.301961, 0.301961, 0.0 ],
					"bgcolor2" : [ 0.301961, 0.301961, 0.301961, 0.0 ],
					"bgfillcolor_angle" : 270.0,
					"bgfillcolor_autogradient" : 0.0,
					"bgfillcolor_color" : [ 0.2, 0.2, 0.2, 0.0 ],
					"bgfillcolor_color1" : [ 0.301961, 0.301961, 0.301961, 0.0 ],
					"bgfillcolor_color2" : [ 0.2, 0.2, 0.2, 1.0 ],
					"bgfillcolor_proportion" : 0.5,
					"bgfillcolor_type" : "color",
					"fontface" : 3,
					"fontname" : "Poppins",
					"gradient" : 1,
					"id" : "obj-20",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 798.0, 718.4000244140625, 138.0, 30.0 ],
					"text" : "<open reference>",
					"textcolor" : [ 0.20392157137394, 0.47843137383461, 0.356862753629684, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-16",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 798.0, 754.399999999999977, 477.0, 35.0 ],
					"text" : ";\r\nmax launchbrowser https://www.tandfonline.com/doi/abs/10.1207/s15327108ijap0303_3"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-8",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 952.0, 548.0, 247.0, 91.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 103.0, 70.0, 380.0, 49.0 ],
					"text" : "A point allocation evaluation where users have a maximum number of points to distribute among relevant attributes. ",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"varname" : "labelsDescription[2]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-1",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 952.0, 295.0, 169.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 70.0, 86.0, 28.0 ],
					"text" : "Information:",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"varname" : "labelsDescription[1]"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"fontname" : "Poppins",
					"fontsize" : 15.0,
					"id" : "obj-34",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 952.0, 265.0, 206.0, 59.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 15.0, 276.588226318359375, 33.0 ],
					"text" : "Questionnaire: Point Allocation",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "newobj",
					"numinlets" : 13,
					"numoutlets" : 13,
					"outlettype" : [ "", "", "", "", "", "", "", "", "", "", "", "", "" ],
					"patching_rect" : [ 171.0, 156.0, 680.0, 22.0 ],
					"text" : "route /slider/q1 /slider/q2 /slider/q3 /slider/q4 /slider/q5 /slider/q6 /slider/q7 /slider/q8 /slider/q9 /slider/q10 /slider/q11 /slider/q12"
				}

			}
, 			{
				"box" : 				{
					"annotation" : "",
					"comment" : "writeResults <list> sends to node.script to stream results to a text file. ",
					"hint" : "",
					"id" : "obj-434",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 183.5, 718.399999999999977, 30.0, 30.0 ],
					"tricolor" : [ 0.235294117647059, 0.992156862745098, 0.0, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"annotation" : "",
					"comment" : "Selected condition output <int>",
					"hint" : "",
					"id" : "obj-433",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 33.0, 718.399999999999977, 30.0, 30.0 ],
					"tricolor" : [ 0.996078431372549, 0.0, 0.0, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"annotation" : "",
					"comment" : "OSC data in. Script <udprecive>",
					"id" : "obj-432",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 567.0, 9.0, 30.0, 30.0 ],
					"tricolor" : [ 0.996078431372549, 0.0, 0.0, 1.0 ],
					"varname" : "udpreceive"
				}

			}
, 			{
				"box" : 				{
					"annotation" : "",
					"comment" : "Number of MUSHRA conditions <int>",
					"id" : "obj-1855",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 46.0, 9.0, 30.0, 30.0 ],
					"tricolor" : [ 0.235294117647059, 0.992156862745098, 0.0, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"background" : 1,
					"bgcolor" : [ 0.219607843137255, 0.219607843137255, 0.219607843137255, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.294117647058824, 0.294117647058824, 0.294117647058824, 0.0 ],
					"id" : "obj-165",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 798.0, 800.400000000000091, 65.0, 70.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 149.135452270507813, 467.83331298828125, 377.647064208984375 ],
					"proportion" : 0.5,
					"rounded" : 15
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"background" : 1,
					"bgcolor" : [ 0.2, 0.2, 0.2, 0.0 ],
					"border" : 2,
					"bordercolor" : [ 0.294117647058824, 0.294117647058824, 0.294117647058824, 1.0 ],
					"drag_window" : 1,
					"hidden" : 1,
					"id" : "obj-2",
					"ignoreclick" : 0,
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 952.0, 495.0, 40.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ -1.470588207244873, 0.0, 501.4705810546875, 540.4273681640625 ],
					"proportion" : 0.5,
					"rounded" : 5
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-47", 0 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-48", 0 ],
					"source" : [ "obj-11", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-49", 0 ],
					"source" : [ "obj-11", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-50", 0 ],
					"source" : [ "obj-11", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"source" : [ "obj-11", 4 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-52", 0 ],
					"source" : [ "obj-11", 5 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-53", 0 ],
					"source" : [ "obj-11", 6 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-54", 0 ],
					"source" : [ "obj-11", 7 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-55", 0 ],
					"source" : [ "obj-11", 8 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-56", 0 ],
					"source" : [ "obj-11", 9 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-57", 0 ],
					"source" : [ "obj-11", 10 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-58", 0 ],
					"source" : [ "obj-11", 11 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-63", 0 ],
					"source" : [ "obj-1855", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-47", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-48", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-49", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 0 ],
					"source" : [ "obj-5", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 0 ],
					"source" : [ "obj-5", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-31", 0 ],
					"source" : [ "obj-5", 4 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-32", 0 ],
					"source" : [ "obj-5", 9 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 0 ],
					"source" : [ "obj-5", 8 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"source" : [ "obj-5", 7 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-44", 0 ],
					"source" : [ "obj-5", 6 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-45", 0 ],
					"source" : [ "obj-5", 5 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-66", 0 ],
					"source" : [ "obj-5", 11 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-68", 0 ],
					"source" : [ "obj-5", 10 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-5", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-50", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-51", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-52", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-53", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-55", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-56", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-57", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-58", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-434", 0 ],
					"order" : 1,
					"source" : [ "obj-63", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-81", 1 ],
					"midpoints" : [ 55.5, 633.0, 679.5, 633.0 ],
					"order" : 0,
					"source" : [ "obj-63", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"order" : 0,
					"source" : [ "obj-7", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-76", 0 ],
					"midpoints" : [ 961.5, 504.0, 83.5, 504.0 ],
					"order" : 1,
					"source" : [ "obj-7", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-63", 0 ],
					"source" : [ "obj-76", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-63", 0 ],
					"source" : [ "obj-78", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-63", 0 ],
					"source" : [ "obj-83", 0 ]
				}

			}
 ],
		"dependency_cache" : [ 			{
				"name" : "questionnaire_PointAllocation.js",
				"bootpath" : "D:/work/_QoEVAVE/github_qoevave/qexe_controller/src/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
 ],
		"autosave" : 0,
		"styles" : [ 			{
				"name" : "AudioStatus_Menu",
				"default" : 				{
					"bgfillcolor" : 					{
						"angle" : 270.0,
						"autogradient" : 0,
						"color" : [ 0.294118, 0.313726, 0.337255, 1 ],
						"color1" : [ 0.454902, 0.462745, 0.482353, 0.0 ],
						"color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
						"proportion" : 0.39,
						"type" : "color"
					}

				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "QExELookAndFeel",
				"default" : 				{
					"locked_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ],
					"stripecolor" : [ 0.243137254901961, 0.243137254901961, 0.243137254901961, 1.0 ],
					"editing_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "jpatcher001",
				"default" : 				{
					"fontsize" : [ 8.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "ksliderWhite",
				"default" : 				{
					"color" : [ 1.0, 1.0, 1.0, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "lightbutton",
				"default" : 				{
					"elementcolor" : [ 0.654902, 0.572549, 0.376471, 1.0 ],
					"bgcolor" : [ 0.309495, 0.299387, 0.299789, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "myStyle",
				"default" : 				{
					"fontsize" : [ 8.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "newobjBlue-1",
				"default" : 				{
					"accentcolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "newobjBrown-1",
				"default" : 				{
					"accentcolor" : [ 0.654902, 0.572549, 0.376471, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "newobjCyan-1",
				"default" : 				{
					"accentcolor" : [ 0.029546, 0.773327, 0.821113, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "newobjGreen-1",
				"default" : 				{
					"accentcolor" : [ 0.0, 0.533333, 0.168627, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "newobjYellow-1",
				"default" : 				{
					"fontsize" : [ 12.059008 ],
					"accentcolor" : [ 0.82517, 0.78181, 0.059545, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "numberGold-1",
				"default" : 				{
					"accentcolor" : [ 0.764706, 0.592157, 0.101961, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "oldschool",
				"parentstyle" : "velvet",
				"multi" : 0
			}
, 			{
				"name" : "purple",
				"default" : 				{
					"textcolor_inverse" : [ 0.701961, 0.415686, 0.886275, 1.0 ],
					"bgcolor" : [ 0.304029, 0.250694, 0.285628, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "receives",
				"default" : 				{
					"accentcolor" : [ 0.870588, 0.415686, 0.062745, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "rsliderGold",
				"default" : 				{
					"color" : [ 0.646639, 0.821777, 0.854593, 1.0 ],
					"bgcolor" : [ 0.764706, 0.592157, 0.101961, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "sends",
				"default" : 				{
					"accentcolor" : [ 0.0, 0.533333, 0.168627, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "sergioStyle",
				"comment" : 				{
					"fontsize" : [ 8.0 ],
					"fontname" : [ "Arial" ]
				}
,
				"number" : 				{
					"fontsize" : [ 8.0 ],
					"fontname" : [ "Arial" ]
				}
,
				"newobj" : 				{
					"fontsize" : [ 8.0 ],
					"fontname" : [ "Arial" ]
				}
,
				"message" : 				{
					"fontsize" : [ 8.0 ],
					"fontname" : [ "Arial" ]
				}
,
				"default" : 				{
					"bgfillcolor" : 					{
						"angle" : 270.0,
						"color" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
						"color1" : [ 0.376471, 0.384314, 0.4, 1.0 ],
						"color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
						"proportion" : 0.39,
						"type" : "gradient"
					}

				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "sgm001",
				"default" : 				{
					"fontsize" : [ 9.0 ],
					"fontname" : [ "Verdana" ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "tastefulltoggle",
				"default" : 				{
					"color" : [ 0.941176, 0.690196, 0.196078, 1.0 ],
					"bgcolor" : [ 0.185512, 0.263736, 0.260626, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "tastefultoggle",
				"default" : 				{
					"elementcolor" : [ 0.654902, 0.572549, 0.376471, 1.0 ],
					"color" : [ 0.941176, 0.690196, 0.196078, 1.0 ],
					"bgcolor" : [ 0.287863, 0.333333, 0.329398, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
 ],
		"color" : [ 0.203921568627451, 0.47843137254902, 0.356862745098039, 1.0 ],
		"bgcolor" : [ 0.235294117647059, 0.235294117647059, 0.235294117647059, 1.0 ]
	}

}
