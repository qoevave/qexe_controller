{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 5,
			"revision" : 1,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 434.0, 538.0, 1020.0, 480.0 ],
		"bglocked" : 0,
		"openinpresentation" : 1,
		"default_fontsize" : 14.0,
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
		"assistshowspatchername" : 0,
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 488.3333740234375, 86.0, 48.0, 24.0 ],
					"text" : "restart"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.294117647058824, 0.294117647058824, 0.294117647058824, 1.0 ],
					"id" : "obj-100",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 425.5, 158.0, 24.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.294117647058824, 0.294117647058824, 0.294117647058824, 1.0 ],
					"color" : [ 0.643137254901961, 0.643137254901961, 0.643137254901961, 1.0 ],
					"id" : "obj-77",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 382.8333740234375, 297.0, 181.0, 24.0 ],
					"text" : "send module_results_writer"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.294117647058824, 0.294117647058824, 0.294117647058824, 1.0 ],
					"id" : "obj-65",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 346.8333740234375, 225.5, 63.0, 24.0 ],
					"text" : "zl.slice 1"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.294117647058824, 0.294117647058824, 0.294117647058824, 1.0 ],
					"id" : "obj-64",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 382.8333740234375, 256.0, 146.0, 24.0 ],
					"text" : "prepend SetSubjectID"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.294117647058824, 0.294117647058824, 0.294117647058824, 1.0 ],
					"id" : "obj-36",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 3,
					"outlettype" : [ "", "bang", "bang" ],
					"patching_rect" : [ 346.8333740234375, 192.5, 273.0, 24.0 ],
					"text" : "dialog Please enter subject ID (NoSpaces)"
				}

			}
, 			{
				"box" : 				{
					"autofit" : 1,
					"data" : [ 5818, "png", "IBkSG0fBZn....PCIgDQRA..AT....PhHX....PIS1hg....DLmPIQEBHf.B7g.YHB..VDWRDEDU3wY6c2GcbWUlG.+46yuIgBTo.RQDTKnffcKzjLAAk2Ju3ptq3K.YaxjRKpr1UTpTJkjIsqgJ1jTrbfEJGdQbgBMIsFQOKxJmiJBxB0WZmVZKfVfkWDPKuprsRoMYdd1+HSBooIY9M2e+l42jYd9bNgCg4284dOyg9z68969BnRXwSl3LAvuZrdFUj2hHrShn2lHZmjRuMAc6DzmkH9OJPepzhr0M2wZdpBSq1XhVwh5FPTCLOIhnIMr+qDQzYQDQdDHOloZaoQRUcqpRagH7fJR+Har8Uu4BdC1XxyPT2.xm7SOEBBU0+OhzGl.dDgjGXiss50mupKioPojNoPMMU+YwddOPgp9DUeZFTm6F7cs4ktpmqPUuFSXxRJjun5uWIrJpRo6TKo6WORZCFiC3ntATxB3iCP2.5kes3IS7Cpt4YczQcSxX7CKoPA..9Jdr9zwapwUWUxFmZT2dLlwhkTn.BdzLiA5IhmLw8VcK0WaT2dLlQhkTHB.fy0i7VWMMknqSXAy5Pi51iwLTVRgHD6gFpnRYqwaogKNpaKFy.rjBQL.bff3ue7jI9MUu3Y9wh51iwXIEJR.fS1Sh8j0jLw2HpaKlxaVRghLLvJpo4D8brK7y+dh51ho7jkTnHDy3BlXrItoZap9pi51ho7y3pMD0TZcNS3f1UeGOCsJPTUDQUSfdwTs00LGomGLqtTOppOGQzuffdLjfiAL9.Aoc6B.bTjm2Fhmrw4kp8NuwBc8aJeUzmTnpEMyOIKwNGn54fd66z5uuMu6pyVU4MFsxph.34k6UJnmMUacM2A903MU2jTTwoQfNSPzL.PM4dPcC.cCwaNwGKUGccIEp5zTdqnKoP7jMbbjRmiB5b.gyDJN.BDQH22lFt1SggK0x54sHhtuL+PwaptIQnh+QBzEBfyMLpiwBX70qIYh8eCs20bx20kwTzjTn1VZ7qHhNO.LcBgyN0x4dJjEYRRzCQTOSs05N38cWwRPJlM7vIF5UVFLvrqIYCSZCs28WLeUGFCQQbRgSXAy5PiUQ5KEDMWhnIy73uMs4StjddShnUPDsh3Mk33IOzLHJQ9ntXveg3sj3WVwN68b+sWWO6LeTGFSj71GldKIppljIVYk6i9JLyKFLOY2i1nOthvZ3C9Upk00VR0VmMtq9nOnp50qht8vtN.gyt2ITwCFuo5lT1eZiI2UPSJTcyIlY7jIVaED1HCL6vIp5n9G7UQhjtdrkqoyWJU6cM+91mJ9Ppp2VXGe.bRDWw8MkVmyDB6XaLEjgOT8hm4Gi6K1Z.SGegn9JVrokrx+FQzbi2Ri2Jo52OLeqE.3TOj2o2exKPzmMrhowPTAnmB0zRCKzSh8jkaIDFpTs04FR0dWwUUtDQz+ZXEW3gOS7VRb2gU7LFhxiIEh2zE9gh2bhGlI9ZxW0Q+b3cUFQR0d22rWe8NUR0eeXESPXVwaNQ6gU7Ll7RRgZZIwEQb5s.FmV9H96oQeNEJFstk2y1Ve6ccRppWeXESvnYaiTYBKgZRgo1ZcGb7jI9wLg6..Gf6QRIk76eVe7SOEFpTs207UkpSE8uGFwiAVQ0Ia7rCiXYJuEZIEldK0cD66tisA.7kbNHClG.D78xWZ7UOEFpTs24OhT5SHh9pgQ7XRW8IdE0cXgQrLkuBkjBSuk5NhXZrGEfmhKkWy7So8AN+HK0x5ZKo0zmjHxyGzXAfCQpnhdBglkoLVfSJT8hRLEWRHnDQj1+fD.UVlOXPaZYq446qWuSREZKAMV.3Tqo4Ft5vncYJOEnjBUunDSABk68PPIBjRD7+fDJ0s4qcUu5NRu8SgD5QCZrXlWrM+BFW4bRgZaNwGFB8nLvQjakTyzs.Kcvvs0u28t8smd6eVkzGOnwhUcUm77qaeCi1ko7hSIEps4DeXko0lKIDFbdCrjAios98t2suKUNGUz+TPhCXbX8tuUZCivjyx4jB0t3FOVko0BBuOeWHUK6m2fbwi29peExK8YopNpGfL9AHZA0t3FO1vpcYJOjS68gSXAyZ+0zx8C3+DBpRDFetTBJHTUmwn8Y+308fe6e9lV6MEj3ueUV4OZc5ptTGJ5uC.kzaOaU0SlHpXbSk8G.vqDUUdNkTnhJkaD.GkuKfNdcoEUXnp99IhdvQ6yOuS7Loy6DOyfVMSarpiwvwQDs0fV4EyDQVCy7GJpaGifKhHZkQUk66jB01RCmOQ3K66HOv6ZzXLiq3q4T3Duh5NLUvc36nZIDLlws7URAohXqAL70kShppkPvXFGKqCeHdxFaFfNc+FvB+jJZyZgwDlFydJTaS0WM.4q8pezssjF+tgnLlhQiZRgSXAyZ+UluG+DD0dKCFSIiQMoPrJS+s76qezRHXLkNF0jBPoKqP1PLFSwgQbhFqokDeMPvG2ECCr0mstJXLkJF4dJHZR+F.KgfwTZYu5oP+qbQ9HyZIsYWLLDn2bxZ25ldom3k+e+.tT1S4XpZkG2QbjO+n84LyutyMrwOb96eQjGlba4imULyOV9Ht90dkTPUpY+7m0U6.RILDnuB24t14xusG3G6zoB8s9KuGIU6ccUAo9KADju+eXOOuqJrZHES1igOTaxFNC.t1rUHaULWb3rOgS9YTQS4Vo0uPt7zoSmtcMfRmN8C4Vacv1vMEf5Nzu99JUsGIEDBWoeJjkPnHBntcpXfO33Mkv22ZWLysJh7btTWCIFmgpp+2TcCgpZMDQecWJqHxelY1daZ9zfIEldqy4.Yf+orVBaADVTAb5enyElwL7c8.ral4Kx45JCQjqSU8fykxnpxhHqjY1o+9Hl4YAf21kxVNZvjBw1UueJeUBaxEKpr9ktlWTU4gcqzZNcXM.fGVD4tbqt5Gy7jDQtgbrXWNy7zbo9DQtM.jWlPvRUClT.Dk0S+WqOBEmTP2mik7Lx0RvLOeQj.cLwwL2nppu1jcppGgHx2wk5IyvFluKksb1fIETj8jBVeDJNIB+PtTN.9fqpoYM8bqL3MCi+flHxcppVoOdte.yrSmJ01vFbCST+2Pz.3ny1C6+62QSgzi0QmqSEc6tTVF41PHHhH.b2hH+ZWpuAqWlOJQjkLVOip54yL+ocI9hH2pMrA2vDQjf9x9PGTa0KVTC3QbqbZ0tTLl4KRDYWNUmuqEppN0Q5CTU2eQjU3RPEQdAl4KOXMsxWLQDw.YenCv5kPwM8gboTrhOhKkC.OOy7U4RYGrtY1SD4tGoOSDoClYmtrbYlSXCavcLQDoJ4i27f0KghYBAmVDSJoNkTHiqQD4IBP4Il4ZTU+F6Qap+0jv2XTJxXRD4V.vZCRapbGWUxFmJy3Pi5FhIX739dJWJGXbXtd8xA.gY9BEQBT2HEQ5PU8PIJXqIgLCaXAAosXHhYJc1e+u1BVpn25W5ZdQWKauUVQVmj4QC.1HQjSi8e.LySTD4Vx7qWlqqIAaXCgiXj5cHYcjA1HGxWBZ116SCmD1al5nShHZg.X44ZgYlaQD47XlywKa38HFeIU04Jhb0Lm6WwohH2jmmWtNrAm+xiYdwppK10xObhH2imm2EDVwKHXBzgD0MhxXkDoaAvNXlcZOMLL2By79kqEJyvF7091YXJI99OrwDzrlTPsu6LYA.9EhH95f9MrYCaHbwT5r2SAKkfwOXluDQjcTHqSQjaxdaCgKl7xdOELF+..upici2I1aaH+fgj8dJXu6AieAfaVD42VHpqLCaHnqpRyv3qIZzF9fIWvLOaQj9xm0gHxJrgMjevDg2aT2HLkV.vSSD0Q9J9YF1vUjuhe4N115il7Al4qNnGeaiDQD0F1P9Eqj9ZQcivT5IrN91FA1vFxyXnvRJXxKxb7scGgU7xLrgEFVwyLxhoL8ZYahDURsyRg7iftQh1BQzaNvuus250O7s82diiIWiyAseGvKOkI+9eFlYm2+DiFl4EHhbtLyA9UeyLegg7vFBxkAyKPD87gWSgBztMMLECDk0dJXIDJNwL2D.t+A983sjnIPHmmfOUz6NUGc46qJvbA.9qppWJQtcTzO.Qjs4448+DRMqvvJ877ZMpaD4CLYyoPICP56yoBxHutJDAvpEQb6jgJCl4CKc5zWcX0lLiNlnrOmB1KnHuIncAaO1NgpimhRpleWZxppGNQjuu3YFCMqp9QCg3Lff78etuUNGmfEM68TvF9v3Df9vtTLUw1B6lxPIhbWLySJnwgYNlHxcFBMIyXfIlx9sKr0QgwE.AGObRvSG1skAnp9kYly5Y.pewL+ITU+JgU7L6MNM7d7r9TVGEJ5chWQcNcHmRDQ6rhc6zQ4V1npd3hHWWXGWQjqMWu54L9Gu4ktpmSD44y5SZ8VnnlTQENMeBhnu5StjdxKyoPXMrggiY9.yGIaL8afIK4Ax1CpVuEJxgZbpTfdlvtkPDQppWTXNrggiYd1pl6W6clriIhH.7qx5SZ8TnHWteSOkQnOeBppSVD45C63NbhH2gppW9tdJ2z+kASu8l0jB.1qlrHmSIETEOVX2PDQti7wvFFNl4ihHJzN7TM8iIhn0s7d1lH5Sl8G2FCQwno2Rhp.vA5RYASNdM1OxTUmMy7+bXFywhHRRU0irPUekCFbAXvJk8dKXcTnnTL0sdIHpriTs04FBq1QlgMbCgU77Cl48IL2zUlgjTP77w7JXcTn3jJeAWJFH7ngYynPMrggiYdFppWXgtdKUMXRg2ohc6qqVbqyBEWpdg0e3f8bZV3URCsgNnpNq.Lrg4Fz5WD45TUcZHTl8TrA9WdxkzyaFOYheJ.N2wp.VmEBUAcqSm36M64e4O6q9RNU9S8iV8Qere2UcUizmwLei.3M7SbTUe+hH2ji2rSWqmm2skNc5ZYl+Wy4.jAy76UDY4DQWbNTrf78+omNc5qJ.keTwL+S.vlxGw1OhMzeIMmtiXZrwLo.Q8+MokbHTDnuFYlSb1S6iSmM8wcMDi0s5T2DQ9JofHx2mY9.x0JWDYaLyKlHhXlWXlqdNmOyPYl+ppp2N.76oIsye+yLe5DQmtqkOKdNhnHKovdjZ+wV5ZVqlVWW1JDHaXDl9EjgMvL+MAv6PDQ.3sXlu7f1dDQtSasKDL6c+87vR7SAgkVnrWl21fS23zhHOH.1iqYN.bWhH+lfzlXlOVhnlBRLJ2sWIER0Vm+2ppaM6E0F.Q4NWeaChH6hY9qNReFy7EEz6LBQjuss1Eb2HNyPPok5qRGNWC5lwgTUaL.CaXo.XDO92AvSQA7NivV6BAyHlTX8cz0cKp9xYsz.VdgxPYF1vM4RYEQdVhn1GqmILtyHxr1EpOHwnb0n9NjfRWieB.rYcrrSPVjRLyeU.LlCOHycFwX8lQ7EQjUnpt+AMNkaF0jBo5nqaPEZK9JJ1zKT1PUMgqCaPDY0.3g7yyBfesHxOzk5Y.CYsKXxAi4pMAwn57afrNKT5KyvFtQWJqHx1YlurboLLyySj.enxNWUUmNqIJWMlIEV+2sysph9s7SfhtNK.qeJEHYF1fSGCZLyKF.uRtTF.7JLyA59nfYFhHqTUsj8zWNrk0un5eXDo809hfHhzB9LOZS0YgfpZCAXXCaA.Ns6IAvJDQR4RYG.y7zHhVPPhQ4jXY+QHhXuFDQeBlwAksGE.jpJA6u.Oq.veQ0rehI8ru1KOwkeu20cHp37Uu1QbPSt6+8y+qca4PQ9SC62+CjiGjKLyA5zchY9ySDEz66g2dDh6LIhlP.ia9veHJqbekTHUac9WptkFlCQ3d8yyi9OllrIfzG7yDuEuoD2O7PftKFW+K8Dy6aeAyM6Gm+iBfv+DZJGp6+LQzeNODW+tGIJq36wYsw159mpp9e56HaupxPQ7lSLO3gOSPhgpxRRsjtcNgfo7RNM4K8taddpnOquKfkXHPpoo5OKv3+HHwPU84R0d2WUH0jLkAxojBa9ZW0eWH9Sqh5+qYLP1bA5fZS9uLM.1WCWaLIvtMkL4jb90zrwNV0yHDeZpH9+1pNyxg1NMn8mpWX8GthX+RvHPqFOkzUkZYc9PgTyxTlvo2c6F6XUOCA5zykDC.8eQ01eZAK4vnY5sNmCjiw+JPvsqU9LTU+ar3kSKVHign.bcZmp8t+i4ZhAhx7BITKsvHIdqet8K1t68mAfiMnwBPu300wc6qSNIiYnBzp7x0DCDfMUCCSUIqaxzteOOJ.9DANXo0Ur9159dx9CZL6s.uzOGLwfJuYtV18b8MU9lgn5EkXJdTr0AvUEzXojr40urttzvncYJOEJqG7Ts28ejDLCWRL7tJOmugoek0+Ovo00AvSInwRTYGBvmOLZWlxWg1lDI0x5ZKBiZTUb9tD.C7OG7MU3mDDieWO0wS13EDi4eGXdxgQ7TPI13R65EBiXYJeEp6brMtztdgTs28YnpdEAJPYdSE9acRO9blIpIYi2L.0SPesiCPTYQarst+ogQrLk2xKamzTs2001aeomlpRAX8xO9pmBmvhl0QEu4F1.C5eKrhonzsrg16tsvJdlxa4s8X9ltlU+DoZu6pUQyy+Oqie5oPMM23kESRuYvb0gULkzZ2an8N+5gU7Ll79AOQpN5ZQ8g9NkbZOSThIdKMVS7VZXSLSWGCdhgUb0z5OeCKqqDgU7LFh764oP.8XKcMqkH5iDukFtXRvB.iiqPTuQso1ZcSbB8VQafnKMry+ppt1WeBU3zsMswLVJHIEFPp1591Iht8ZaogyWUbY.3TCdTG84T.LGICsX5sNmCza28MOra8RAB14fvHQUcs6nuc7Ydg1u22IriswTPSJLfLq1t6o5VpuVHbSLiKv8nM5yofJBfWg6ZEbZIq+8sODtBZW8NWv38jONkYTkt+WuxJNOKgfIeIRRJLfM11pWOQTcUunDSgUcgjhuL.1unrMkqlZq0Mw8Y2U9EYRqG.8eFFlmdeHppclp8tlU9I5FS+hzjBCHyBt4aFu0O2Up6dhmBo7LHPy..exfD270vGh2TcSh3J+TDktdzq242eRf77aFUnqIUGcYWbpl7thhjBCH0Rtu2lH5Wj4GJdqet8i10jNUBxLHByHW2rPg0vGh2TcSR7hc5PwL.Qy..YtGAJLCMQU4RR0Q22bAoxLk8JpRJLbYRR7yy7CMkVmyDNnc02wyPqBDUEQT0DvdcJ8N.PdhK0KHb1wSl3VIUOZhvGEL9.d8+AEThn+UP5rR0Q2+rBaMaJmMtZ0.lqpoo5OK1y6Ah51gKByiIeU02gH8wIReLEd+fMzVm1oXrYTY2ZNEiB46MC.LA.tV.uKFh9H01biKaJsNmhw66.SQ.KoPQjAucsxiamCvviX5JOj2ou6LuUIlw0rjBEQJj2pVvilYsIan9BVEZF2vRJD0hvS4ZQQyQREaJpURmTPYuh2IRUy7OF7riHB.53O44W29FMUtoXUIcRAH88Ai51vHRURKDK3orfA3dqrxSJRaDlhNkzIEJpLzQHfHquA6EAos2BgYOTRmTP4XuXT2FF7NtnXIKvvDquzQ1sIso3TIcRAHoilYvSGxTGhh17AjR5qrtk2i+uWPMkEJoSJTvMPlfhngGLVTAcD0sASwmh589v3NiGxDjgnx+0F5n6qOpaGlhOkz8THL25zJ0+w4x3miI1Qlnpnpr72nxJsEtjYDUR2Sgrt0oyrVA5eh.e26D69+q7UZfaspAuAJFG0SfgZfMDkpzlHlu8Ts0ksgnLFiwXLFiwXLA0+OvQHEktIXv6s.....PRE4DQtJDXBB" ],
					"embed" : 1,
					"forceaspect" : 1,
					"id" : "obj-3",
					"maxclass" : "fpic",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "jit_matrix" ],
					"patching_rect" : [ 32.0, 18.0, 133.372268676757812, 70.007665933777091 ],
					"pic" : "QExE.png",
					"presentation" : 1,
					"presentation_rect" : [ 2.0, 16.580459594726562, 114.0, 59.839080459770116 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.211764705882353, 0.215686274509804, 0.215686274509804, 1.0 ],
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 488.3333740234375, 118.0, 67.0, 24.0 ],
					"style" : "QExELookAndFeel",
					"text" : "s restart"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.211764705882353, 0.215686274509804, 0.215686274509804, 1.0 ],
					"id" : "obj-7",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 346.8333740234375, 97.0, 81.0, 24.0 ],
					"style" : "QExELookAndFeel",
					"text" : "s subjectID"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.211764705882353, 0.215686274509804, 0.215686274509804, 1.0 ],
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 205.3333740234375, 97.0, 74.0, 24.0 ],
					"style" : "QExELookAndFeel",
					"text" : "s loadFile"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 488.3333740234375, 32.5, 111.0, 41.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 400.3333740234375, 32.0, 100.0, 29.0 ],
					"rounded" : 8.0,
					"style" : "QExELookAndFeel",
					"text" : "Restart",
					"texton" : "Load config"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 346.8333740234375, 32.5, 111.0, 41.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 272.3333740234375, 32.0, 100.0, 29.0 ],
					"rounded" : 8.0,
					"style" : "QExELookAndFeel",
					"text" : "Subject ID",
					"texton" : "Load config"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-31",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 205.3333740234375, 32.5, 111.0, 41.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 144.3333740234375, 32.0, 100.0, 29.0 ],
					"rounded" : 8.0,
					"style" : "QExELookAndFeel",
					"text" : "Load File",
					"texton" : "Load config"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-36", 0 ],
					"order" : 0,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"order" : 1,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-36", 0 ],
					"source" : [ "obj-100", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-65", 0 ],
					"source" : [ "obj-36", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-77", 0 ],
					"source" : [ "obj-64", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 0 ],
					"source" : [ "obj-65", 1 ]
				}

			}
 ],
		"dependency_cache" : [ 			{
				"name" : "QExE.png",
				"bootpath" : "~/Documents/Work/dfg_2021_qoevave/fau.gitlab/qexe/qexe_max/host/media",
				"patcherrelativepath" : "../media",
				"type" : "PNG",
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
					"bgcolor" : [ 0.172549019607843, 0.403921568627451, 0.301960784313725, 1.0 ],
					"color" : [ 0.92156862745098, 0.92156862745098, 0.92156862745098, 1.0 ],
					"editing_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ],
					"fontname" : [ "Arial" ],
					"fontsize" : [ 14.0 ],
					"locked_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ],
					"stripecolor" : [ 0.243137254901961, 0.243137254901961, 0.243137254901961, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "QExELookAndFeel-1",
				"default" : 				{
					"editing_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ],
					"locked_bgcolor" : [ 0.211764705882353, 0.211764705882353, 0.211764705882353, 1.0 ],
					"stripecolor" : [ 0.243137254901961, 0.243137254901961, 0.243137254901961, 1.0 ]
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
				"comment" : 				{
					"fontname" : [ "Arial" ],
					"fontsize" : [ 8.0 ]
				}
,
				"message" : 				{
					"fontname" : [ "Arial" ],
					"fontsize" : [ 8.0 ]
				}
,
				"newobj" : 				{
					"fontname" : [ "Arial" ],
					"fontsize" : [ 8.0 ]
				}
,
				"number" : 				{
					"fontname" : [ "Arial" ],
					"fontsize" : [ 8.0 ]
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
					"color" : [ 0.941176, 0.690196, 0.196078, 1.0 ],
					"elementcolor" : [ 0.654902, 0.572549, 0.376471, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
 ]
	}

}
