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
		"rect" : [ 159.0, 473.0, 1748.0, 771.0 ],
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
		"digest" : "",
		"tags" : "",
		"style" : "QExELookAndFeel",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"annotation" : "routing matrix",
					"comment" : "",
					"hint" : "routing matrix",
					"id" : "obj-45",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 442.0, 190.0, 59.0, 59.0 ],
					"tricolor" : [ 0.568627450980392, 0.811764705882353, 0.545098039215686, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Poppins",
					"id" : "obj-41",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1124.800048828125, 125.0, 115.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 133.105270385742188, 355.0, 36.0, 28.0 ],
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"varname" : "numberOfFiles"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-47",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 708.0, 11.888885498046875, 67.0, 22.0 ],
					"text" : "clearBuffer"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-40",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 569.0714111328125, 11.888885498046875, 127.0, 22.0 ],
					"text" : "loadmess FindObjects"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-67",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1266.800048828125, 120.388916015625, 139.0, 22.0 ],
					"text" : "setwithtruncation $1 300"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-66",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1344.800048828125, 89.5, 139.0, 22.0 ],
					"text" : "setwithtruncation $1 300"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-33",
					"maxclass" : "newobj",
					"numinlets" : 3,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 1266.800048828125, 59.388916015625, 175.0, 22.0 ],
					"text" : "route ObjectsDir AmbisonicsDir"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-76",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 205.528564453125, 15.0, 182.0, 22.0 ],
					"text" : "receive panel_audio_information"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-73",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1082.0, 743.0, 93.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 133.105270385742188, 248.0, 354.0, 24.0 ],
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"varname" : "text_video_file"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Poppins",
					"id" : "obj-74",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1082.0, 712.0, 93.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 133.105270385742188, 222.0, 354.0, 28.0 ],
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"varname" : "text_visuals_type"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-71",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1004.0, 741.0, 75.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 49.543861389160156, 245.0, 82.0, 28.0 ],
					"text" : "Video File:",
					"textcolor" : [ 0.583999991416931, 0.583999991416931, 0.583999991416931, 1.0 ],
					"textjustification" : 2
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-72",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1004.0, 712.0, 76.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 49.543861389160156, 222.0, 82.0, 28.0 ],
					"text" : "Visuals: ",
					"textcolor" : [ 0.583999991416931, 0.583999991416931, 0.583999991416931, 1.0 ],
					"textjustification" : 2
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"fontname" : "Poppins",
					"fontsize" : 13.0,
					"id" : "obj-70",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1004.0, 681.0, 171.0, 29.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 197.0, 247.0, 29.0 ],
					"text" : "Visual Information",
					"textcolor" : [ 0.690196096897125, 0.690196096897125, 0.690196096897125, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 2,
					"fontname" : "Bookman Old Style",
					"fontsize" : 16.0,
					"id" : "obj-69",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1003.800048828125, 439.0, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 461.70794677734375, 433.0, 21.092050552368164, 20.0 ],
					"rounded" : 26.0,
					"text" : "i",
					"texton" : "i",
					"textoncolor" : [ 0.96078431372549, 0.96078431372549, 0.96078431372549, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 2,
					"fontname" : "Bookman Old Style",
					"fontsize" : 16.0,
					"id" : "obj-68",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1003.800048828125, 471.0, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 461.70794677734375, 309.0, 21.092050552368164, 20.0 ],
					"rounded" : 26.0,
					"text" : "i",
					"texton" : "i",
					"textoncolor" : [ 0.96078431372549, 0.96078431372549, 0.96078431372549, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"fontname" : "Poppins",
					"fontsize" : 13.0,
					"id" : "obj-64",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1003.800048828125, 374.0, 250.0, 29.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 431.0, 247.0, 29.0 ],
					"text" : "Audio Information (multi-channel)",
					"textcolor" : [ 0.690196096897125, 0.690196096897125, 0.690196096897125, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"fontname" : "Poppins",
					"fontsize" : 13.0,
					"id" : "obj-61",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1003.800048828125, 404.0, 193.0, 29.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 52.0, 178.0, 29.0 ],
					"text" : ".JSON Scene Information",
					"textcolor" : [ 0.690196096897125, 0.690196096897125, 0.690196096897125, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-57",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 287.028564453125, 430.888885498046875, 131.0, 22.0 ],
					"text" : "s loadObjectRenderers"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-59",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 426.04998779296875, 430.888885498046875, 158.0, 22.0 ],
					"text" : "s loadAmbisonicsRenderers"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-56",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 596.0714111328125, 273.888885498046875, 150.0, 22.0 ],
					"text" : "s numberOfObjectSources"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-54",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 205.528564453125, 277.0, 75.0, 22.0 ],
					"text" : "s loopStatus"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"fontsize" : 16.0,
					"id" : "obj-3",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1266.800048828125, 193.0, 41.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 378.065093994140625, 305.0, 22.0, 24.0 ],
					"text" : "|",
					"textcolor" : [ 0.694117665290833, 0.694117665290833, 0.694117665290833, 1.0 ],
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 3,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 285.028564453125, 276.888885498046875, 197.0, 22.0 ],
					"text" : "route Objects Multichannel"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "newobj",
					"numinlets" : 3,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 206.028564453125, 52.0, 177.0, 22.0 ],
					"text" : "route RouteLoop VSTContainer"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-7",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 310.04998779296875, 397.888885498046875, 59.0, 22.0 ],
					"text" : "openVST"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-178",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 448.04998779296875, 397.888885498046875, 59.0, 22.0 ],
					"text" : "openVST"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-179",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 448.04998779296875, 365.888885498046875, 87.0, 22.0 ],
					"text" : "prepend target",
					"varname" : "prependOpenAmbis"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-62",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 310.04998779296875, 363.888885498046875, 87.0, 22.0 ],
					"text" : "prepend target",
					"varname" : "prependOpen"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 3,
					"fontname" : "Poppins",
					"id" : "obj-10",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1266.800048828125, 248.0, 78.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 73.043861389160156, 380.0, 58.5, 28.0 ],
					"text" : "VST List:",
					"textcolor" : [ 0.583999991416931, 0.583999991416931, 0.583999991416931, 1.0 ],
					"textjustification" : 2
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-35",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1004.0, 286.0, 205.0, 22.0 ],
					"text" : "ambisonics OpenAmbisonicsWindow"
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
					"id" : "obj-32",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1004.0, 256.0, 86.0, 30.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 399.174407958984375, 429.0, 59.0, 30.0 ],
					"text" : "<buffer>",
					"textcolor" : [ 0.20392157137394, 0.47843137383461, 0.356862753629684, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-12",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1004.0, 155.0, 119.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 324.0, 355.0, 46.0, 28.0 ],
					"text" : "Bytes: ",
					"textcolor" : [ 0.583999991416931, 0.583999991416931, 0.583999991416931, 1.0 ],
					"textjustification" : 2
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Poppins",
					"id" : "obj-15",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1124.800048828125, 155.0, 115.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 369.4385986328125, 355.0, 117.666671752929688, 28.0 ],
					"textcolor" : [ 0.583999991416931, 0.583999991416931, 0.583999991416931, 1.0 ],
					"varname" : "polybufferSize"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 3,
					"fontname" : "Poppins",
					"id" : "obj-50",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1266.800048828125, 222.0, 77.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 73.043861389160156, 481.0, 60.0, 28.0 ],
					"text" : "VST List:",
					"textcolor" : [ 0.583999991416931, 0.583999991416931, 0.583999991416931, 1.0 ],
					"textjustification" : 2
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
					"id" : "obj-27",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 348.0, 110.0, 81.0, 30.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 317.38861083984375, 305.0, 67.0, 30.0 ],
					"text" : "<routing>",
					"textcolor" : [ 0.20392157137394, 0.47843137383461, 0.356862753629684, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-20",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1004.0, 185.0, 119.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 177.524246215820313, 355.0, 100.039215087890625, 28.0 ],
					"text" : "Virtual sources:",
					"textcolor" : [ 0.583999991416931, 0.583999991416931, 0.583999991416931, 1.0 ],
					"textjustification" : 2
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Poppins",
					"id" : "obj-26",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1124.800048828125, 185.0, 115.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 279.5634765625, 355.0, 36.0, 28.0 ],
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"varname" : "numberOfObjects"
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
					"id" : "obj-31",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1004.199951171875, 55.111114501953125, 86.0, 30.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 394.271942138671875, 305.0, 66.0, 30.0 ],
					"text" : "<buffers>",
					"textcolor" : [ 0.20392157137394, 0.47843137383461, 0.356862753629684, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-38",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1344.800048828125, 185.000030517578125, 130.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 133.105270385742188, 460.0, 354.0, 24.0 ],
					"text" : " ",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"varname" : "multichannelFile"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-39",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1004.0, 215.0, 120.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 11.543861389160156, 332.0, 120.0, 28.0 ],
					"text" : "Content directory: ",
					"textcolor" : [ 0.583999991416931, 0.583999991416931, 0.583999991416931, 1.0 ],
					"textjustification" : 2
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-42",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 8,
							"minor" : 0,
							"revision" : 3,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"classnamespace" : "box",
						"openrect" : [ 1237.0, 476.0, 900.0, 720.0 ],
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
						"devicewidth" : 900.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"style" : "",
						"subpatcher_template" : "",
						"title" : "Routing~ Display",
						"visible" : 1,
						"boxes" : [ 							{
								"box" : 								{
									"angle" : 270.0,
									"arrow_orientation" : 2,
									"bgcolor" : [ 0.827450980392157, 0.827450980392157, 0.827450980392157, 1.0 ],
									"id" : "obj-52",
									"maxclass" : "panel",
									"mode" : 0,
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 892.0, 65.0, 21.0, 24.518074035644531 ],
									"presentation" : 1,
									"presentation_rect" : [ 505.576263427734375, 652.0, 21.0, 24.518074035644531 ],
									"proportion" : 0.5,
									"shape" : 3
								}

							}
, 							{
								"box" : 								{
									"angle" : 270.0,
									"bgcolor" : [ 0.827450980392157, 0.827450980392157, 0.827450980392157, 1.0 ],
									"id" : "obj-50",
									"maxclass" : "panel",
									"mode" : 0,
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 65.0, 21.0, 24.518074035644531 ],
									"presentation" : 1,
									"presentation_rect" : [ 30.0, 329.69879150390625, 21.0, 24.518074035644531 ],
									"proportion" : 0.5,
									"shape" : 3
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-48",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 281.666656494140625, 105.0, 105.0, 22.0 ],
									"text" : "prepend Filename"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-54",
									"maxclass" : "newobj",
									"numinlets" : 4,
									"numoutlets" : 4,
									"outlettype" : [ "", "", "", "" ],
									"patching_rect" : [ 183.0, 73.518074035644531, 167.0, 22.0 ],
									"text" : "route Matrix Display Filename"
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-5",
									"index" : 2,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 183.0, 27.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-51",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 421.74700927734375, 73.518074035644531, 106.0, 22.0 ],
									"text" : "loadmess initialize"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-32",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 421.74700927734375, 121.849502563476563, 151.0, 22.0 ],
									"saved_object_attributes" : 									{
										"filename" : "panel_routing_filenames",
										"parameter_enable" : 0
									}
,
									"text" : "js panel_routing_filenames"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-49",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 181.692794799804688, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 65.45782470703125, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.69803923368454, 0.69803923368454, 0.69803923368454, 1.0 ],
									"textjustification" : 2,
									"varname" : "file0"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-33",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 715.6927490234375, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 599.45782470703125, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.921568632125854, 0.91372549533844, 0.91372549533844, 1.0 ],
									"textjustification" : 2,
									"varname" : "file31"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-34",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 698.6927490234375, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 582.45782470703125, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.69803923368454, 0.69803923368454, 0.69803923368454, 1.0 ],
									"textjustification" : 2,
									"varname" : "file30"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-35",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 681.76593017578125, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 565.531005859375, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.921568632125854, 0.91372549533844, 0.91372549533844, 1.0 ],
									"textjustification" : 2,
									"varname" : "file29"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-36",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 664.86346435546875, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 548.6285400390625, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.69803923368454, 0.69803923368454, 0.69803923368454, 1.0 ],
									"textjustification" : 2,
									"varname" : "file28"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-37",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 646.9366455078125, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 530.70172119140625, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.921568632125854, 0.91372549533844, 0.91372549533844, 1.0 ],
									"textjustification" : 2,
									"varname" : "file27"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-38",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 629.9366455078125, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 513.70172119140625, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.69803923368454, 0.69803923368454, 0.69803923368454, 1.0 ],
									"textjustification" : 2,
									"varname" : "file26"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-39",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 612.00982666015625, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 495.77490234375, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.921568632125854, 0.91372549533844, 0.91372549533844, 1.0 ],
									"textjustification" : 2,
									"varname" : "file25"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-40",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 594.59521484375, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 478.36029052734375, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.69803923368454, 0.69803923368454, 0.69803923368454, 1.0 ],
									"textjustification" : 2,
									"varname" : "file24"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-41",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 576.6683349609375, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 460.433441162109375, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.921568632125854, 0.91372549533844, 0.91372549533844, 1.0 ],
									"textjustification" : 2,
									"varname" : "file23"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-42",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 559.6683349609375, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 443.433441162109375, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.69803923368454, 0.69803923368454, 0.69803923368454, 1.0 ],
									"textjustification" : 2,
									"varname" : "file22"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-43",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 542.7415771484375, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 426.506622314453125, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.921568632125854, 0.91372549533844, 0.91372549533844, 1.0 ],
									"textjustification" : 2,
									"varname" : "file21"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-44",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 525.839111328125, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 409.60418701171875, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.69803923368454, 0.69803923368454, 0.69803923368454, 1.0 ],
									"textjustification" : 2,
									"varname" : "file20"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-45",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 507.9122314453125, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 391.677337646484375, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.921568632125854, 0.91372549533844, 0.91372549533844, 1.0 ],
									"textjustification" : 2,
									"varname" : "file19"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-46",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 490.91229248046875, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 374.677337646484375, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.69803923368454, 0.69803923368454, 0.69803923368454, 1.0 ],
									"textjustification" : 2,
									"varname" : "file18"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-47",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 473.9854736328125, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 357.750518798828125, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.921568632125854, 0.91372549533844, 0.91372549533844, 1.0 ],
									"textjustification" : 2,
									"varname" : "file17"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-24",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 457.653533935546875, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 341.4185791015625, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.69803923368454, 0.69803923368454, 0.69803923368454, 1.0 ],
									"textjustification" : 2,
									"varname" : "file16"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-25",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 439.726715087890625, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 323.49176025390625, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.921568632125854, 0.91372549533844, 0.91372549533844, 1.0 ],
									"textjustification" : 2,
									"varname" : "file15"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-26",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 422.726715087890625, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 306.49176025390625, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.69803923368454, 0.69803923368454, 0.69803923368454, 1.0 ],
									"textjustification" : 2,
									"varname" : "file14"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-27",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 405.79986572265625, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 289.564910888671875, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.921568632125854, 0.91372549533844, 0.91372549533844, 1.0 ],
									"textjustification" : 2,
									"varname" : "file13"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-28",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 388.897430419921875, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 272.6624755859375, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.69803923368454, 0.69803923368454, 0.69803923368454, 1.0 ],
									"textjustification" : 2,
									"varname" : "file12"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-29",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 370.970611572265625, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 254.73565673828125, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.921568632125854, 0.91372549533844, 0.91372549533844, 1.0 ],
									"textjustification" : 2,
									"varname" : "file11"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-30",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 353.970611572265625, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 237.73565673828125, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.69803923368454, 0.69803923368454, 0.69803923368454, 1.0 ],
									"textjustification" : 2,
									"varname" : "file10"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-31",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 336.043792724609375, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 219.808837890625, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.921568632125854, 0.91372549533844, 0.91372549533844, 1.0 ],
									"textjustification" : 2,
									"varname" : "file9"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-20",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 318.629150390625, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 202.394195556640625, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.69803923368454, 0.69803923368454, 0.69803923368454, 1.0 ],
									"textjustification" : 2,
									"varname" : "file8"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-21",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 300.70233154296875, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 184.467376708984375, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.921568632125854, 0.91372549533844, 0.91372549533844, 1.0 ],
									"textjustification" : 2,
									"varname" : "file7"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-22",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 283.70233154296875, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 167.467376708984375, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.69803923368454, 0.69803923368454, 0.69803923368454, 1.0 ],
									"textjustification" : 2,
									"varname" : "file6"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-23",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 266.775482177734375, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 150.54052734375, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.921568632125854, 0.91372549533844, 0.91372549533844, 1.0 ],
									"textjustification" : 2,
									"varname" : "file5"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-10",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 249.873062133789063, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 133.638092041015625, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.69803923368454, 0.69803923368454, 0.69803923368454, 1.0 ],
									"textjustification" : 2,
									"varname" : "file4"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-18",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 231.946243286132813, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 115.711273193359375, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.921568632125854, 0.91372549533844, 0.91372549533844, 1.0 ],
									"textjustification" : 2,
									"varname" : "file3"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-9",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 214.946243286132813, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 98.711265563964844, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.69803923368454, 0.69803923368454, 0.69803923368454, 1.0 ],
									"textjustification" : 2,
									"varname" : "file2"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 9.0,
									"id" : "obj-3",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 198.0194091796875, 181.170730590820313, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 81.784431457519531, 181.170730590820313, 22.0 ],
									"textcolor" : [ 0.921568632125854, 0.91372549533844, 0.91372549533844, 1.0 ],
									"textjustification" : 2,
									"varname" : "file1"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-12",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 307.0, 144.849502563476563, 35.0, 22.0 ],
									"text" : "clear"
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-2",
									"index" : 1,
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 22.891567230224609, 418.726715087890625, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 0.250980392156863, 0.301960784313725, 0.325490196078431, 1.0 ],
									"id" : "obj-13",
									"maxclass" : "textbutton",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 22.891567230224609, 383.4315185546875, 113.5, 25.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 640.240966796875, 113.5, 25.0 ],
									"rounded" : 15.0,
									"text" : "View Buffers~",
									"texton" : "View Buffers~",
									"textoncolor" : [ 0.92156862745098, 0.92156862745098, 0.92156862745098, 1.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-19",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 22.89156711101532, 239.759045004844666, 45.0, 22.0 ],
									"text" : "wclose"
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 0.250980392156863, 0.301960784313725, 0.325490196078431, 1.0 ],
									"id" : "obj-17",
									"maxclass" : "textbutton",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 22.89156711101532, 190.385523557662964, 113.5, 25.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 670.240966796875, 74.5, 25.0 ],
									"rounded" : 15.0,
									"text" : "Close",
									"texton" : "Close",
									"textoncolor" : [ 0.92156862745098, 0.92156862745098, 0.92156862745098, 1.0 ]
								}

							}
, 							{
								"box" : 								{
									"fontface" : 1,
									"fontname" : "Poppins",
									"fontsize" : 16.0,
									"id" : "obj-16",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 143.849502563476563, 255.0, 35.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 414.076263427734375, 31.45782470703125, 217.0, 35.0 ],
									"text" : "Audio File Routing",
									"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
									"textjustification" : 1
								}

							}
, 							{
								"box" : 								{
									"fontsize" : 14.0,
									"id" : "obj-15",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 99.849502563476563, 250.0, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 403.076263427734375, 623.95782470703125, 239.0, 22.0 ],
									"text" : "VST Input Channel (Virtual Object)",
									"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
									"textjustification" : 1
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Poppins",
									"fontsize" : 14.0,
									"id" : "obj-14",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 863.0, 121.849502563476563, 258.0, 31.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 32.45782470703125, 180.0, 31.0 ],
									"text" : "Audio File",
									"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
									"textjustification" : 1
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-11",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 22.891567230224609, 77.518074035644531, 33.0, 22.0 ],
									"text" : "front"
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-8",
									"index" : 1,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 22.891567230224609, 27.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-6",
									"index" : 2,
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 183.0, 517.839111328125, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"columns" : 32,
									"id" : "obj-7",
									"invisiblebkgnd" : 1,
									"maxclass" : "matrixctrl",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "list", "list" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 307.0, 181.692794799804688, 555.0, 555.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 238.576263427734375, 65.45782470703125, 555.0, 555.0 ],
									"rows" : 32
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-4",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 6.391567230224609, 112.518074035644531, 130.0, 22.0 ],
									"text" : "title \"Routing~ Display\""
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-1",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 6.391567230224609, 140.518081665039063, 67.0, 22.0 ],
									"save" : [ "#N", "thispatcher", ";", "#Q", "end", ";" ],
									"text" : "thispatcher"
								}

							}
, 							{
								"box" : 								{
									"angle" : 270.0,
									"background" : 1,
									"bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ],
									"border" : 2,
									"bordercolor" : [ 0.294117647058824, 0.294117647058824, 0.294117647058824, 0.0 ],
									"id" : "obj-58",
									"maxclass" : "panel",
									"mode" : 0,
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 587.0, 73.849502563476563, 67.0, 70.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 56.576263427734375, 65.45782470703125, 181.170730590820313, 555.0 ],
									"proportion" : 0.5,
									"rounded" : 5
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-1", 0 ],
									"source" : [ "obj-11", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-7", 0 ],
									"source" : [ "obj-12", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-2", 0 ],
									"source" : [ "obj-13", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-19", 0 ],
									"source" : [ "obj-17", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-1", 0 ],
									"source" : [ "obj-19", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-1", 0 ],
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-32", 0 ],
									"source" : [ "obj-48", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-54", 0 ],
									"source" : [ "obj-5", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-32", 0 ],
									"source" : [ "obj-51", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-48", 0 ],
									"source" : [ "obj-54", 2 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-6", 0 ],
									"source" : [ "obj-54", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-7", 0 ],
									"source" : [ "obj-54", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-11", 0 ],
									"source" : [ "obj-8", 0 ]
								}

							}
 ],
						"styles" : [ 							{
								"name" : "AudioStatus_Menu",
								"default" : 								{
									"bgfillcolor" : 									{
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
, 							{
								"name" : "QExELookAndFeel",
								"default" : 								{
									"stripecolor" : [ 0.243137254901961, 0.243137254901961, 0.243137254901961, 1.0 ],
									"editing_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ],
									"locked_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "QExELookAndFeel-1",
								"default" : 								{
									"stripecolor" : [ 0.243137254901961, 0.243137254901961, 0.243137254901961, 1.0 ],
									"editing_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ],
									"locked_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "jpatcher001",
								"default" : 								{
									"fontsize" : [ 8.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "ksliderWhite",
								"default" : 								{
									"color" : [ 1.0, 1.0, 1.0, 1.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "lightbutton",
								"default" : 								{
									"bgcolor" : [ 0.309495, 0.299387, 0.299789, 1.0 ],
									"elementcolor" : [ 0.654902, 0.572549, 0.376471, 1.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "myStyle",
								"default" : 								{
									"fontsize" : [ 8.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "newobjBlue-1",
								"default" : 								{
									"accentcolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "newobjBrown-1",
								"default" : 								{
									"accentcolor" : [ 0.654902, 0.572549, 0.376471, 1.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "newobjCyan-1",
								"default" : 								{
									"accentcolor" : [ 0.029546, 0.773327, 0.821113, 1.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "newobjGreen-1",
								"default" : 								{
									"accentcolor" : [ 0.0, 0.533333, 0.168627, 1.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "newobjYellow-1",
								"default" : 								{
									"accentcolor" : [ 0.82517, 0.78181, 0.059545, 1.0 ],
									"fontsize" : [ 12.059008 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "numberGold-1",
								"default" : 								{
									"accentcolor" : [ 0.764706, 0.592157, 0.101961, 1.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "oldschool",
								"parentstyle" : "velvet",
								"multi" : 0
							}
, 							{
								"name" : "purple",
								"default" : 								{
									"bgcolor" : [ 0.304029, 0.250694, 0.285628, 1.0 ],
									"textcolor_inverse" : [ 0.701961, 0.415686, 0.886275, 1.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "receives",
								"default" : 								{
									"accentcolor" : [ 0.870588, 0.415686, 0.062745, 1.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "rsliderGold",
								"default" : 								{
									"bgcolor" : [ 0.764706, 0.592157, 0.101961, 1.0 ],
									"color" : [ 0.646639, 0.821777, 0.854593, 1.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "sends",
								"default" : 								{
									"accentcolor" : [ 0.0, 0.533333, 0.168627, 1.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "sergioStyle",
								"comment" : 								{
									"fontname" : [ "Arial" ],
									"fontsize" : [ 8.0 ]
								}
,
								"number" : 								{
									"fontname" : [ "Arial" ],
									"fontsize" : [ 8.0 ]
								}
,
								"newobj" : 								{
									"fontname" : [ "Arial" ],
									"fontsize" : [ 8.0 ]
								}
,
								"message" : 								{
									"fontname" : [ "Arial" ],
									"fontsize" : [ 8.0 ]
								}
,
								"default" : 								{
									"bgfillcolor" : 									{
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
, 							{
								"name" : "sgm001",
								"default" : 								{
									"fontname" : [ "Verdana" ],
									"fontsize" : [ 9.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "tastefulltoggle",
								"default" : 								{
									"bgcolor" : [ 0.185512, 0.263736, 0.260626, 1.0 ],
									"color" : [ 0.941176, 0.690196, 0.196078, 1.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "tastefultoggle",
								"default" : 								{
									"bgcolor" : [ 0.287863, 0.333333, 0.329398, 1.0 ],
									"elementcolor" : [ 0.654902, 0.572549, 0.376471, 1.0 ],
									"color" : [ 0.941176, 0.690196, 0.196078, 1.0 ]
								}
,
								"parentstyle" : "",
								"multi" : 0
							}
 ],
						"bgcolor" : [ 0.235294117647059, 0.235294117647059, 0.235294117647059, 1.0 ],
						"editing_bgcolor" : [ 0.235294117647059, 0.235294117647059, 0.235294117647059, 1.0 ]
					}
,
					"patching_rect" : [ 348.0, 149.0, 113.0, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"editing_bgcolor" : [ 0.235294117647059, 0.235294117647059, 0.235294117647059, 1.0 ],
						"globalpatchername" : "",
						"locked_bgcolor" : [ 0.235294117647059, 0.235294117647059, 0.235294117647059, 1.0 ],
						"tags" : ""
					}
,
					"text" : "p routingDisplay"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-43",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 569.0714111328125, 52.0, 73.0, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "audiodata",
						"parameter_enable" : 0
					}
,
					"text" : "js audiodata"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-44",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1004.0, 125.0, 119.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 59.543861389160156, 355.0, 72.0, 28.0 ],
					"text" : "Audio files:",
					"textcolor" : [ 0.583999991416931, 0.583999991416931, 0.583999991416931, 1.0 ],
					"textjustification" : 2
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-46",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1004.199951171875, 86.111114501953125, 163.0, 22.0 ],
					"text" : "objects OpenObjectsWindow"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-48",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1004.0, 11.888885498046875, 120.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 11.543861389160156, 456.0, 120.0, 28.0 ],
					"text" : "Content directory: ",
					"textcolor" : [ 0.583999991416931, 0.583999991416931, 0.583999991416931, 1.0 ],
					"textjustification" : 2
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"fontname" : "Poppins",
					"fontsize" : 13.0,
					"id" : "obj-49",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1003.800048828125, 343.0, 193.0, 29.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 307.0, 203.0, 29.0 ],
					"text" : "Audio Information (mono)",
					"textcolor" : [ 0.690196096897125, 0.690196096897125, 0.690196096897125, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Poppins",
					"fontsize" : 10.0,
					"id" : "obj-51",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1266.800048828125, 155.0, 130.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 133.105270385742188, 334.0, 354.0, 24.0 ],
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"varname" : "objectsFolder"
				}

			}
, 			{
				"box" : 				{
					"comment" : "Directory to read audio files into polybuffer",
					"id" : "obj-52",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 816.800048828125, 336.0, 43.0, 43.0 ],
					"varname" : "outlet1[1]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-29",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1003.800048828125, 503.0, 164.0, 28.0 ],
					"text" : "Current audio condition: ",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"varname" : "dimensionsLabel[3]"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"fontname" : "Courier New",
					"fontsize" : 24.0,
					"id" : "obj-21",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1097.300048828125, 625.5, 37.0, 34.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 412.063018798828125, 126.965118408203125, 60.0, 34.0 ],
					"text" : "N",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"varname" : "number_of_items"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"fontname" : "Courier New",
					"fontsize" : 36.0,
					"id" : "obj-18",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1054.300048828125, 619.0, 34.0, 47.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 387.216522216796875, 104.813949584960938, 30.0, 47.0 ],
					"text" : "/",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"fontname" : "Courier New",
					"fontsize" : 24.0,
					"id" : "obj-9",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1003.800048828125, 625.5, 40.0, 34.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 348.844451904296875, 98.674415588378906, 45.0, 34.0 ],
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"textjustification" : 2,
					"varname" : "current_item"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-6",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1003.800048828125, 576.0, 171.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 322.38861083984375, 63.0, 160.0, 28.0 ],
					"text" : "Item progression",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"varname" : "dimensionsLabel[2]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-17",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1200.5, 714.0, 95.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 36.350875854492188, 77.0, 95.192985534667969, 28.0 ],
					"text" : "Scene Index: ",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "dimensionsLabel[1]"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Poppins",
					"id" : "obj-13",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1297.5, 714.0, 73.5, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 133.543853759765625, 77.0, 54.0, 28.0 ],
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"varname" : "text_scene_index"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-2",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1003.800048828125, 546.0, 104.8148193359375, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 35.350875854492188, 143.0, 96.192985534667969, 28.0 ],
					"text" : "Dimensions: ",
					"textcolor" : [ 0.583999991416931, 0.583999991416931, 0.583999991416931, 1.0 ],
					"textjustification" : 2,
					"varname" : "label_dimensions"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Poppins",
					"id" : "obj-14",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1110.300048828125, 546.0, 64.5, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 133.543853759765625, 143.0, 164.0, 28.0 ],
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"varname" : "text_dimensions"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-37",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1200.0, 774.0, 95.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 36.350875854492188, 99.0, 95.192985534667969, 28.0 ],
					"text" : "Stimuli ID: ",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-36",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1200.0, 744.0, 97.0, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 34.350875854492188, 121.0, 97.192985534667969, 28.0 ],
					"text" : "Unity scene ID: ",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"fontname" : "Poppins",
					"fontsize" : 15.0,
					"id" : "obj-34",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1200.0, 681.0, 171.0, 33.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 15.0, 260.0, 33.0 ],
					"text" : "Current Item",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Poppins",
					"id" : "obj-28",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1297.5, 774.0, 73.5, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 133.543853759765625, 99.0, 164.0, 28.0 ],
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"varname" : "text_scene_id"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Poppins",
					"id" : "obj-25",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1297.5, 744.0, 73.5, 28.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 133.543853759765625, 121.0, 164.0, 28.0 ],
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"varname" : "text_unity_scene_id"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1467.050048828125, 681.0, 128.0, 22.0 ],
					"text" : "r panel_current_scene",
					"varname" : "send_to_panel_current_scene_information"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-30",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1467.050048828125, 714.0, 155.0, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "panel_scene_information",
						"parameter_enable" : 0
					}
,
					"text" : "js panel_scene_information"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"background" : 1,
					"bgcolor" : [ 0.219607843137255, 0.219607843137255, 0.219607843137255, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.294117647058824, 0.294117647058824, 0.294117647058824, 0.0 ],
					"id" : "obj-23",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1388.0, 681.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 322.38861083984375, 89.674415588378906, 160.0, 80.837211608886719 ],
					"proportion" : 0.5,
					"rounded" : 15
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-30", 0 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-59", 0 ],
					"source" : [ "obj-178", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-178", 0 ],
					"source" : [ "obj-179", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-42", 0 ],
					"source" : [ "obj-27", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-46", 0 ],
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 0 ],
					"source" : [ "obj-32", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-66", 0 ],
					"source" : [ "obj-33", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-67", 0 ],
					"source" : [ "obj-33", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-52", 0 ],
					"source" : [ "obj-35", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"source" : [ "obj-4", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-54", 0 ],
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-4", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"source" : [ "obj-40", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-45", 0 ],
					"source" : [ "obj-42", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-42", 1 ],
					"source" : [ "obj-43", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-52", 0 ],
					"source" : [ "obj-43", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-56", 0 ],
					"source" : [ "obj-43", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-52", 0 ],
					"source" : [ "obj-46", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"source" : [ "obj-47", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-62", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-38", 0 ],
					"source" : [ "obj-66", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"source" : [ "obj-67", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-57", 0 ],
					"source" : [ "obj-7", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"source" : [ "obj-76", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-57", 0 ],
					"source" : [ "obj-8", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-59", 0 ],
					"source" : [ "obj-8", 1 ]
				}

			}
 ],
		"dependency_cache" : [ 			{
				"name" : "panel_scene_information.js",
				"bootpath" : "D:/work/_QoEVAVE/gitlab_fau/QExE/MaxHost/host/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "audiodata.js",
				"bootpath" : "D:/work/_QoEVAVE/gitlab_fau/QExE/MaxHost/host/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "panel_routing_filenames.js",
				"bootpath" : "D:/work/_QoEVAVE/gitlab_fau/QExE/MaxHost/host/code",
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
					"stripecolor" : [ 0.243137254901961, 0.243137254901961, 0.243137254901961, 1.0 ],
					"editing_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ],
					"locked_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "QExELookAndFeel-1",
				"default" : 				{
					"stripecolor" : [ 0.243137254901961, 0.243137254901961, 0.243137254901961, 1.0 ],
					"editing_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ],
					"locked_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "QExELookAndFeel-2",
				"default" : 				{
					"stripecolor" : [ 0.243137254901961, 0.243137254901961, 0.243137254901961, 1.0 ],
					"editing_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ],
					"locked_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ]
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
					"bgcolor" : [ 0.309495, 0.299387, 0.299789, 1.0 ],
					"elementcolor" : [ 0.654902, 0.572549, 0.376471, 1.0 ]
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
					"accentcolor" : [ 0.82517, 0.78181, 0.059545, 1.0 ],
					"fontsize" : [ 12.059008 ]
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
					"bgcolor" : [ 0.304029, 0.250694, 0.285628, 1.0 ],
					"textcolor_inverse" : [ 0.701961, 0.415686, 0.886275, 1.0 ]
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
					"bgcolor" : [ 0.764706, 0.592157, 0.101961, 1.0 ],
					"color" : [ 0.646639, 0.821777, 0.854593, 1.0 ]
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
					"fontname" : [ "Arial" ],
					"fontsize" : [ 8.0 ]
				}
,
				"number" : 				{
					"fontname" : [ "Arial" ],
					"fontsize" : [ 8.0 ]
				}
,
				"newobj" : 				{
					"fontname" : [ "Arial" ],
					"fontsize" : [ 8.0 ]
				}
,
				"message" : 				{
					"fontname" : [ "Arial" ],
					"fontsize" : [ 8.0 ]
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
					"fontname" : [ "Verdana" ],
					"fontsize" : [ 9.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "tastefulltoggle",
				"default" : 				{
					"bgcolor" : [ 0.185512, 0.263736, 0.260626, 1.0 ],
					"color" : [ 0.941176, 0.690196, 0.196078, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "tastefultoggle",
				"default" : 				{
					"bgcolor" : [ 0.287863, 0.333333, 0.329398, 1.0 ],
					"elementcolor" : [ 0.654902, 0.572549, 0.376471, 1.0 ],
					"color" : [ 0.941176, 0.690196, 0.196078, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
 ]
	}

}
