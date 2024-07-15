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
		"rect" : [ 532.0, 552.0, 1048.0, 665.0 ],
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
		"globalpatchername" : "methodP910[1][1]",
		"boxes" : [ 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-14",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 715.0, 75.0, 169.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 39.916656494140625, 306.0, 81.0, 20.0 ],
					"text" : "Slider value",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[3]"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"id" : "obj-13",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 715.0, 293.000030517578125, 18.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 75.916656494140625, 246.135452270507813, 18.0, 20.0 ],
					"text" : "|",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"id" : "obj-12",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 736.0, 293.000030517578125, 18.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 158.910415649414063, 246.135452270507813, 18.0, 20.0 ],
					"text" : "|",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"id" : "obj-10",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 757.666748046875, 293.000030517578125, 18.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 239.916656494140625, 246.135452270507813, 18.0, 20.0 ],
					"text" : "|",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"id" : "obj-5",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 797.666748046875, 293.000030517578125, 18.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 321.27227783203125, 246.135452270507813, 18.0, 20.0 ],
					"text" : "|",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 561.0, 105.0, 50.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 529.0, 158.666656494140625, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-33",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 117.5, 244.0, 282.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-21",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 441.5, 225.0, 149.0, 22.0 ],
					"text" : "prepend SetCurrentRating"
				}

			}
, 			{
				"box" : 				{
					"color" : [ 0.211764705882353, 0.568627450980392, 0.588235294117647, 1.0 ],
					"id" : "obj-9",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 441.5, 10.0, 104.0, 22.0 ],
					"text" : "receive osc_in_all"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-26",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 58.5, 23.0, 204.0, 60.0 ],
					"text" : "Input from testmanager.js. \n\nRequirements must include a 'writeResult' and 'setItem' message. ",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-40",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 26.5, 191.0, 133.0, 20.0 ],
					"text" : "Extra output if needed. ",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-39",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 243.5, 191.0, 174.0, 20.0 ],
					"text" : "Sent to module_ResultsWriter",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.2, 0.2, 0.2, 0.0 ],
					"format" : 6,
					"id" : "obj-29",
					"maxclass" : "flonum",
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 441.5, 190.0, 50.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 122.749984741210938, 309.0, 50.0, 22.0 ]
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
					"patching_rect" : [ 715.0, 175.0, 169.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 369.0, 16.5, 115.0, 22.0 ],
					"text" : "<open reference>",
					"textcolor" : [ 0.20392157137394, 0.47843137383461, 0.356862753629684, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-16",
					"linecount" : 4,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 715.0, 225.0, 169.0, 62.0 ],
					"text" : ";\r\nmax launchbrowser https://www.itu.int/rec/T-REC-P.910-200804-I/en"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-8",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 715.0, 105.0, 169.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 97.833328247070313, 70.0, 385.0, 20.0 ],
					"text" : "Single stimulus method. ",
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
					"patching_rect" : [ 715.0, 45.0, 169.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 70.0, 81.0, 20.0 ],
					"text" : "Information:",
					"textcolor" : [ 0.584313750267029, 0.584313750267029, 0.584313750267029, 1.0 ],
					"textjustification" : 2,
					"varname" : "labelsDescription[1]"
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
					"patching_rect" : [ 715.0, 10.0, 200.0, 23.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 15.0, 200.0, 23.0 ],
					"text" : "Methodology: ACR",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-15",
					"maxclass" : "newobj",
					"numinlets" : 3,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 441.5, 105.0, 53.0, 22.0 ],
					"text" : "clip 0 10"
				}

			}
, 			{
				"box" : 				{
					"floatoutput" : 1,
					"id" : "obj-7",
					"knobshape" : 5,
					"maxclass" : "slider",
					"numinlets" : 1,
					"numoutlets" : 1,
					"orientation" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 441.5, 144.0, 95.666656494140625, 32.395721435546875 ],
					"presentation" : 1,
					"presentation_rect" : [ 39.916656494140625, 172.802139282226563, 418.0, 67.0623779296875 ],
					"size" : 10.0,
					"varname" : "sldr/acr"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 441.5, 61.0, 120.0, 22.0 ],
					"text" : "route /slider/p910-11"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 26.5, 118.0, 236.0, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "method_ACR",
						"parameter_enable" : 0
					}
,
					"text" : "js method_ACR"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"id" : "obj-462",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 777.666748046875, 293.000030517578125, 18.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 403.376556396484375, 246.253097534179688, 18.0, 20.0 ],
					"text" : "|",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-403",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 715.0, 325.0, 39.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 65.416664123535156, 268.13543701171875, 39.0, 20.0 ],
					"text" : "Bad",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-401",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 757.666748046875, 325.0, 42.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 146.910415649414063, 268.13543701171875, 42.0, 20.0 ],
					"text" : "Poor",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"textjustification" : 1,
					"varname" : "label1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-402",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 805.3333740234375, 325.0, 39.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 229.416656494140625, 268.13543701171875, 39.0, 20.0 ],
					"text" : "Fair ",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"textjustification" : 1,
					"varname" : "label3"
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
					"patching_rect" : [ 850.8333740234375, 325.0, 49.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 305.77227783203125, 268.13543701171875, 49.0, 20.0 ],
					"text" : "Good ",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"textjustification" : 1,
					"varname" : "label5"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Poppins",
					"id" : "obj-399",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 903.3333740234375, 325.0, 73.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 375.876556396484375, 268.13543701171875, 73.0, 20.0 ],
					"text" : "Excellent ",
					"textcolor" : [ 0.996078431606293, 0.996078431606293, 0.996078431606293, 1.0 ],
					"textjustification" : 1
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
					"patching_rect" : [ 261.5, 158.0, 30.0, 30.0 ],
					"tricolor" : [ 0.376470588235294, 0.992156862745098, 0.0, 1.0 ]
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
					"patching_rect" : [ 26.5, 158.0, 30.0, 30.0 ],
					"tricolor" : [ 0.376470588235294, 0.992156862745098, 0.0, 1.0 ]
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
					"patching_rect" : [ 406.0, 10.0, 30.0, 30.0 ],
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
					"patching_rect" : [ 26.5, 23.0, 30.0, 30.0 ],
					"tricolor" : [ 0.376470588235294, 0.992156862745098, 0.0, 1.0 ]
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
					"patching_rect" : [ 714.8333740234375, 358.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 130.135452270507813, 467.83331298828125, 265.117645263671875 ],
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
					"hidden" : 1,
					"id" : "obj-2",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 715.0, 135.0, 169.0, 31.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 0.0, 500.0, 414.0 ],
					"proportion" : 0.5,
					"rounded" : 3
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
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
					"destination" : [ "obj-6", 0 ],
					"midpoints" : [ 451.0, 256.0, 422.0, 256.0, 422.0, 107.0, 36.0, 107.0 ],
					"source" : [ "obj-21", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 0 ],
					"source" : [ "obj-29", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-33", 1 ],
					"midpoints" : [ 253.0, 224.5, 390.0, 224.5 ],
					"order" : 0,
					"source" : [ "obj-6", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-433", 0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-434", 0 ],
					"order" : 1,
					"source" : [ "obj-6", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-29", 0 ],
					"source" : [ "obj-7", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"source" : [ "obj-9", 0 ]
				}

			}
 ],
		"dependency_cache" : [ 			{
				"name" : "method_ACR.js",
				"bootpath" : "D:/rbo/GitLab/QExE/maxhost/host/code",
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
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "QExELookAndFeel-1",
				"default" : 				{
					"stripecolor" : [ 0.243137254901961, 0.243137254901961, 0.243137254901961, 1.0 ],
					"locked_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ],
					"editing_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "QExELookAndFeel-2",
				"default" : 				{
					"stripecolor" : [ 0.243137254901961, 0.243137254901961, 0.243137254901961, 1.0 ],
					"locked_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ],
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
 ],
		"bgcolor" : [ 0.235294117647059, 0.235294117647059, 0.235294117647059, 1.0 ],
		"editing_bgcolor" : [ 0.235294117647059, 0.235294117647059, 0.235294117647059, 1.0 ]
	}

}
