const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const VideoMotion = require('./library');
const ArgumentType = require('../../extension-support/argument-type');
const Clone = require('../../util/clone');

const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI4MHB4IiBoZWlnaHQ9IjgwcHgiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgODAgODAiIHhtbDpzcGFjZT0icHJlc2VydmUiPiAgPGltYWdlIGlkPSJpbWFnZTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgeD0iMCIgeT0iMCIKICAgIGhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRkFBQUFCUUVBUUFBQUIwaU9abEFBQUFCR2RCVFVFQUFMR1BDL3hoQlFBQUFDQmpTRkpOCkFBQjZKZ0FBZ0lRQUFQb0FBQUNBNkFBQWRUQUFBT3BnQUFBNm1BQUFGM0NjdWxFOEFBQUFBbUpMUjBULy94U3JNYzBBQUFBSmNFaFoKY3dBQURpQUFBQTRnQVNMc1lXY0FBQUFIZEVsTlJRZmpCQmtOTnpWSytZb2RBQUFMYWtsRVFWUjQydTJjZVhRVVZSckZmOTJkN3FSUgp0aUVoSklRa2JDS1p5QnFEeUlEZ0Jzb2k0a0FnQ0hvRUhlQ0lMRTVBSVV3QURXZk93RUFVSFVDRVFSUVJOS0lZRUJHRG9qQWltMGdRCkE1TWRRZ3dKWklXUVRuZk5IMCtFeEtTcXVydTZLM2ptbnZQK3FmcnErKzY5dGJ5cVY2OEtHaVU2dEliVkVoUWNodW9LeUg0UFhsNEUKQVVGNk03c0pFSm9EZSt3Z2ZRNlNkTDNaQjhIR1ZHaHhpOTRNR3pNK2dxVlZ0WTI3c2RWc2hTbkg5U2JaaUJFd0EzNlkxN0NCa2dRcApDV0JacXpmVGF6RHFUYUEybWdlQS94TDVtRGFSWU8yaE45TnI4TkdiUUcwWUE4RFlWeUdtTHhpbjY4MzBWelo2RTZpRGMwQ2VRa3dCCmNFbHZvdGZRMkF5ODZmQi9BOTJFTjYrQjRkQ2tOelN6UXRWZFVCb08wakM5RFhBWFhqRFFhSUx3UW5oa0NReGRDdTN1Z25KL1NDMkgKMVRNZzh4VU5hdlNCaUJGd3o4L1FlalhrZG9LdjRpR2pIMGhoTjZtQmhqWFF0UXM4OVNXTVNvRHdJMkF3QUFmRit0NUEvekh3WkM5SQpQK3A2SFhNd1REa0hjenRDVzMvZ0trZ1BRTTRrZUg4OHZCMERKN1BCY2RDVFJtcU0wSEI0NlNYSTJRM1NZZmtiNDdVZmd1bTAyTzYyCnYwRkJpSHo4MGNQUWN1RDFXcVBIUW5tckJ1TFB3ZG5YNGVXSkVIYUgzcTZvZ044eUdKc0p4eXBCdWxYZWlHc3R5d2hoNTEwejBKb0wKdTk1UXJ1SEloaE1aTUdFVCtHM1JVckdHdlhEb2M3RHlDMWovTFBSb0FwU3IyNjc1SEdqUndyV2FBY3VoeTkzS2NZWXdpT3dBYTN4ZwpWVHAwWEthVmFpME1mQjRHOW9UM1MyRHllTER1Y0c3emtsdWdaTDFycFIxVHdGR29QdDQ2QnA1Y0FPK3ZoZnVXZ0tHTEJ2cmRnZWtXCmlCMEFaNjNxVHRmNjJwb2pZRW9RK1p3OWhYMGpZZHRNMStxZXI0UkpCZUFUNm80RGJoeUJaZ004Mnh0ZWZ4dmFYbll0eC81RHNPd2QKc0M5eWJmdXJhYkNxRFZ5WTV2eTJiWnJBaXBVd3V5bjRKcm51ZzB2d0tZVFpDVkRSeXZrOTcvQ0RqTkh3OTY4aHZIdnR2Szcwd29ZQwpHQjBISnc2Qkk4eDVQbGMyd3dJYldONzBrbm5HS0pnK0V5cW1Pa2ZVN29BZnpzSHNQdEQrQ3pDYytHMXVWd3dFSUJEYURZVFo2K0I0Ck83Q25Pc2Z0OG5hWVV3ZyttN3hnNEpnZGNOSGtITUd6eVREZkFTRzlnRDgwbk50bEEyOUE4T2N3endhNUVjNXhMSjhCVDMwSHRQYWcKZWYyYVEzYWhlbEkxVStIalFvanFDSVpubFBOcllTQUFtZEJ6TTJ3YkRyWS9xZWViL3hqY24rRWg4NEpYd1ZkWDFKTXBIUThKZTZIRgpIUFUxTkRQd0Z6UWJBZk8vZ0VzVDFmTStNZ3M2YVAySWEwNkFWeWM0c1NjcllHSWltUFk1VjBkckF3Rk1Gb2laQzNubDZ2bXZpd0svCmREWFpWZDdHUFB4ZmVQSjdkYkZuOThHVWVOajRJOWdIdUwzdjNJYTlHcmFzaHNtYklXdTV1bTFpZmVIUHV6UWlFR1NCL3d4UnQrY0sKUnNJamJqd21lZUlJdkJGRFZrQmVCM1Zham4wRG9ZclB6U3FPd0FtTG9NOUs1YmlLUUpqWEN6NCs2N3FCbnNhdVdSQzNHMG9xbFdONwo5SU9udXdPeVo1R0NnWjJhd3FROE1IU1NqNVBhd2NvbzJKZ0pKT2x0a3p5MjVzQ3l0V0JYTVJvK1lSWkV1R05nYkE3YzlycHlvYzhHCndUOURvR2FEM3ZZb3czRWZ2QllNbjN5a0hCdTJFNTRJQVFhN1VDaWtQNlM5cHVLNk53ejZmYXVOT0U5ZkEyOUVWSC9JKzFwWjM1bTkKMEw2cW9Td3lSK0REd2RBMVFKbkl1cmx3WUtJMkJub1RoOC9CRzhPQVorWGpPczJHNFlrTnJXM0FRT3VETUxJSWpHUGtrNmRmaFBWSgpJSjNXMnc0WGtBa2J2b00wcGNsS1IyRmtQN2kxM2lrbkRSZ1lNUnVpODVVNWJGb0hHY2w2TytFNjhyckFXMDhETytYamVoYkJIUW4xCnJXbkF3RUdWME9wSGhlSnQ0SU5VdlMxd0h4OXRnS3haOGpFdHhzTzkyZld0cWNkQXl4K2hmNHh5NFQxN0lEM1dBNG9NS3RZcnhUaUIKREFQc0xsV082NWNGdnIvcFRPb3hNSGd0ZEZPNGNiWjFnSlFjY0dqZGVRUUNiUlJpcWdHYmRpV2xWTmc1QXE3K0pCOFgrVGlFVEtpNwp0QjRET3grSE5wSjhzcHpUY01nRHo3bTJMVkN0Y0lOYkhRODFZOVRsVTRzanB5Q251M3hNWUFuYzlramRwZlVZR0RFTi9LYktKenMrCkFNNG5hU3NDb0FqSUdpSWZrMzRJS3RPMHJWdndKbnkvV3o3R2NnbHVWNU5zMVFqbG04djV6YlEzN3hvbVg0Q3I3ZXF2Vzd3UEhsam8KbWJvdkRGYld2YWFwUWhKemU5aStWejZKYlJNOGV0aHpCbHBUNEtVQ0tCMVg1elZrUGt3NUJVYUhaK3FPREFXYndtdUFsRkZnZmxVbQpTYk1ZT05oWFlhVFpCSGVxSEZkekZlWnlHSGdhbGl5Q056dkFnaytoOTN3d3hudXVadTlMVU5KSlh2dkI1NkJaM0kxYjFSbTZ0a3JRCnZJZDhvZklXY0hHRlp3MjBOWVV2Z1M5TlFFdmdJYy9XQTdnMENzcTdRM09abU9iK1lMME1aYjh1cWRPSm1EZURKVXUrME9YeFVQbTkKNXdVQllFZjBMRjdBNVNDNC9LQjhqS1VDTEovZXVLU09nWmJwWVBhWFQxTDliNmdwOW80b2I2Sm1CRlFyakh1YXI0QzUxbTFXblZQWQo4QTVpRnJ3TURIUEJjRUZ2dWRyRDBBNk1xY0M5TWtIL0FFT3RHLzA2QnRyT2d6MENrRG1OL1U2QTVhTGVjcldISlJuOHpzbkgyRzhICld6N3c2L2Q2ZFF5OCtpSlVLWnpDdmtsZzdhTzNYTzFoL1FCOEZhWUJWd1VJajY2anpqV3dLaG5LRkdZNk5Zc0EvOS9oWjZmK1FVS2IKSE1xbUNZOGFoRGtiVXJJVnBtdlV3T2dTdmVWcWo5RWxRcHZzalhTMjhPZzY2aHlCdG5ESVUzak9OSm1nUzFlOTVXcVBMbDJGTmpuawpwUW1QcnFPZU9TQ25WYnpYamZwUWRPbTJlNVZqYndhWVV5SEtxaHlueGh1R05JT3FLUGxET1dNVWhIcHFGcE1PQ00wUW11UTBWMFVKCmIycWpudUdzOU81UW9EQ2MxYTQvUlB2cUxWczdSUHNLVFhJb21BN3BQZXN1cmNmQS9EYVE5cTU4TXZOTUdMRUxUSW5jOURBbENpM20KbWZKeGFWY2dQMEpWU3BnelVubHNMTGNNdXA3VVc3Nzc2SHBTYUZIU083ZWJFMG52M0FyRm1jcEpGeitodDN6M3NmZ0paWjBYL1NHNgpyUk5KbTJUQVoyK3BtUGJRSFRvTjFOc0MxOUZwb05DZ3BQT3pyZEJFeFh2eVdwZ3lBQnlqbFpNdkhRekdGNTFNM2doZ2ZGRndWOUxuCkdDMjhjQnFoWDhPcEJjb0ZMcndEOXlqOTU2QVI0cDQ4d1YxSjM2a0Z3Z3VYc0ZERnhWV1NZRThPQkhiVTJ4TDFDT3dvT0t2UnRyRE0KalVLZFkrRk1rb3BDZldINWMyQytDWWE1ekJjRlY2bXZzcTR6U2NJRHQvRENkK0RZcjF5c2NoaE1Dd1NERTE5UGVodUdRc0d4Y3BpSwphOTkrb2QxdEJKbmcyMWgxaDN2eHV4QWJDYWlZVytOMXhBaHV4ZStxMC9KdHJOQ3VDUjY5RThxMnFTdGNjRC9FcmdMakVQZnJhZ1hqCkVNR3A0SDUxR3NxMkNjMmF3WndJcjR4VlYxeVNvTGdVcGgwRHl3eTlyUVBMTkpoMlJIQlN5LytWc1VLenBnZ3VnSDFCNmtsVUxvU2sKMVJENHF0dWxYVWJnS0VnYUFaWHg2bm52Q3hKYVBZSzd3aURUQ1RLT2wySHZYMkhRVmpCNThmc1IwMDh3NkVGSXJRVEhYUFY4TStPRgpSby9pc1crZ0tGRTlLVW1DNGdSWXZnODZGNEloem4wT0RjRVFCNTN6WWZseUtCN25ITWVpUktITjR6RHNnR2VPUXFrVEgrOUpFa2pkCklUTVpscXlIeUVmQlI4TkpRajRPa1hQSmVzajhBS1J1em5FckxSZWFERTcrTU1ObG1IYkQ5RStnOUppVEprb2d4VUwrUW5pdkpZekwKaGc0UGdhOExrNVY4bDR0dHgyV0xYUGtMUlc1bitaUWVFMXBNdTUzbjRKNkoyK0daWGxBVTQ0S0p2elRiWU1nNUFEczN3T0pxZUR3RgpCclNFcmlFUVhnM0JrMFFMcnhiTEJyUVVNWXVyeFRZNUIwUU9WK3NYeFFnTnB1MWVOdThhRE9kaDFDekk3T202aUZxZHp0MVFhWVdmClV5QjNLSnpwSmxydVVMR3MwaXBpdEtpVjJWTndONXpYeWJ3YkVUME12dW9Maml4dHhIbXlPYklFMStqRzl1dTlvS0d3SWdyS1hQZ1YKaXJkYVdTdkJNV2lvM200MUFQTmlHSjROQi9hRFBWcC93NjQxZTdUZ05EeGJjR3owYUowTWNhRncyZ2lPb3pxZXJrY0ZoN2hRd2VubQp3blpvWHd6eFMrRmttUGdMdWJlTXE5a3Fhc1l2RlJ6UXE1ZlZCQnVnN1ZSNHFoQjJUSVlMSlNBNStWTWNWYTBIRkJsaHgxOUVyYlpUClJlM2ZGZndLb0VjbHpBeUQ1R053Mmc0Vjk0RkR4YnVKMzV5ZVc2QWlCczUwZ1E5Ync4d1owRE1FL0x3Nm9LdmhSM3ZPd2pJYmdwK0gKaUZ6b2RnRWlwMEw3dFJBOERwclBneWIrWUxhTFdKc0pMcGRBNmI4Z2Z3OWtUWWUwamZCREN6alZDczdGUWZVOFBWVDhEOVJKb1V5aAphaS9wQUFBQUpYUkZXSFJrWVhSbE9tTnlaV0YwWlFBeU1ERTVMVEEwTFRJMVZESXdPalUxT2pVekxUQTNPakF3MTRreHlnQUFBQ1YwClJWaDBaR0YwWlRwdGIyUnBabmtBTWpBeE9TMHdOQzB5TlZReU1EbzFOVG8xTXkwd056b3dNS2JVaVhZQUFBQVpkRVZZZEZOdlpuUjMKWVhKbEFIZDNkeTVwYm10elkyRndaUzV2Y21lYjdqd2FBQUFBQUVsRlRrU3VRbUNDIiAvPgo8L3N2Zz4K';
const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI4MHB4IiBoZWlnaHQ9IjgwcHgiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgODAgODAiIHhtbDpzcGFjZT0icHJlc2VydmUiPiAgPGltYWdlIGlkPSJpbWFnZTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgeD0iMCIgeT0iMCIKICAgIGhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRkFBQUFCUUVBUUFBQUIwaU9abEFBQUFCR2RCVFVFQUFMR1BDL3hoQlFBQUFDQmpTRkpOCkFBQjZKZ0FBZ0lRQUFQb0FBQUNBNkFBQWRUQUFBT3BnQUFBNm1BQUFGM0NjdWxFOEFBQUFBbUpMUjBULy94U3JNYzBBQUFBSmNFaFoKY3dBQURpQUFBQTRnQVNMc1lXY0FBQUFIZEVsTlJRZmpCQmtOTnpWSytZb2RBQUFMYWtsRVFWUjQydTJjZVhRVVZSckZmOTJkN3FSUgp0aUVoSklRa2JDS1p5QnFEeUlEZ0Jzb2k0a0FnQ0hvRUhlQ0lMRTVBSVV3QURXZk93RUFVSFVDRVFSUVJOS0lZRUJHRG9qQWltMGdRCkE1TWRRZ3dKWklXUVRuZk5IMCtFeEtTcXVydTZLM2ptbnZQK3FmcnErKzY5dGJ5cVY2OEtHaVU2dEliVkVoUWNodW9LeUg0UFhsNEUKQVVGNk03c0pFSm9EZSt3Z2ZRNlNkTDNaQjhIR1ZHaHhpOTRNR3pNK2dxVlZ0WTI3c2RWc2hTbkg5U2JaaUJFd0EzNlkxN0NCa2dRcApDV0JacXpmVGF6RHFUYUEybWdlQS94TDVtRGFSWU8yaE45TnI4TkdiUUcwWUE4RFlWeUdtTHhpbjY4MzBWelo2RTZpRGMwQ2VRa3dCCmNFbHZvdGZRMkF5ODZmQi9BOTJFTjYrQjRkQ2tOelN6UXRWZFVCb08wakM5RFhBWFhqRFFhSUx3UW5oa0NReGRDdTN1Z25KL1NDMkgKMVRNZzh4VU5hdlNCaUJGd3o4L1FlalhrZG9LdjRpR2pIMGhoTjZtQmhqWFF0UXM4OVNXTVNvRHdJMkF3QUFmRit0NUEvekh3WkM5SQpQK3A2SFhNd1REa0hjenRDVzMvZ0trZ1BRTTRrZUg4OHZCMERKN1BCY2RDVFJtcU0wSEI0NlNYSTJRM1NZZmtiNDdVZmd1bTAyTzYyCnYwRkJpSHo4MGNQUWN1RDFXcVBIUW5tckJ1TFB3ZG5YNGVXSkVIYUgzcTZvZ044eUdKc0p4eXBCdWxYZWlHc3R5d2hoNTEwejBKb0wKdTk1UXJ1SEloaE1aTUdFVCtHM1JVckdHdlhEb2M3RHlDMWovTFBSb0FwU3IyNjc1SEdqUndyV2FBY3VoeTkzS2NZWXdpT3dBYTN4ZwpWVHAwWEthVmFpME1mQjRHOW9UM1MyRHllTER1Y0c3emtsdWdaTDFycFIxVHdGR29QdDQ2QnA1Y0FPK3ZoZnVXZ0tHTEJ2cmRnZWtXCmlCMEFaNjNxVHRmNjJwb2pZRW9RK1p3OWhYMGpZZHRNMStxZXI0UkpCZUFUNm80RGJoeUJaZ004Mnh0ZWZ4dmFYbll0eC81RHNPd2QKc0M5eWJmdXJhYkNxRFZ5WTV2eTJiWnJBaXBVd3V5bjRKcm51ZzB2d0tZVFpDVkRSeXZrOTcvQ0RqTkh3OTY4aHZIdnR2Szcwd29ZQwpHQjBISnc2Qkk4eDVQbGMyd3dJYldONzBrbm5HS0pnK0V5cW1Pa2ZVN29BZnpzSHNQdEQrQ3pDYytHMXVWd3dFSUJEYURZVFo2K0I0Ck83Q25Pc2Z0OG5hWVV3ZyttN3hnNEpnZGNOSGtITUd6eVREZkFTRzlnRDgwbk50bEEyOUE4T2N3endhNUVjNXhMSjhCVDMwSHRQYWcKZWYyYVEzYWhlbEkxVStIalFvanFDSVpubFBOcllTQUFtZEJ6TTJ3YkRyWS9xZWViL3hqY24rRWg4NEpYd1ZkWDFKTXBIUThKZTZIRgpIUFUxTkRQd0Z6UWJBZk8vZ0VzVDFmTStNZ3M2YVAySWEwNkFWeWM0c1NjcllHSWltUFk1VjBkckF3Rk1Gb2laQzNubDZ2bXZpd0svCmREWFpWZDdHUFB4ZmVQSjdkYkZuOThHVWVOajRJOWdIdUwzdjNJYTlHcmFzaHNtYklXdTV1bTFpZmVIUHV6UWlFR1NCL3d4UnQrY0sKUnNJamJqd21lZUlJdkJGRFZrQmVCM1Zham4wRG9ZclB6U3FPd0FtTG9NOUs1YmlLUUpqWEN6NCs2N3FCbnNhdVdSQzNHMG9xbFdONwo5SU9udXdPeVo1R0NnWjJhd3FROE1IU1NqNVBhd2NvbzJKZ0pKT2x0a3p5MjVzQ3l0V0JYTVJvK1lSWkV1R05nYkE3YzlycHlvYzhHCndUOURvR2FEM3ZZb3czRWZ2QllNbjN5a0hCdTJFNTRJQVFhN1VDaWtQNlM5cHVLNk53ejZmYXVOT0U5ZkEyOUVWSC9JKzFwWjM1bTkKMEw2cW9Td3lSK0REd2RBMVFKbkl1cmx3WUtJMkJub1RoOC9CRzhPQVorWGpPczJHNFlrTnJXM0FRT3VETUxJSWpHUGtrNmRmaFBWSgpJSjNXMnc0WGtBa2J2b00wcGNsS1IyRmtQN2kxM2lrbkRSZ1lNUnVpODVVNWJGb0hHY2w2TytFNjhyckFXMDhETytYamVoYkJIUW4xCnJXbkF3RUdWME9wSGhlSnQ0SU5VdlMxd0h4OXRnS3haOGpFdHhzTzkyZld0cWNkQXl4K2hmNHh5NFQxN0lEM1dBNG9NS3RZcnhUaUIKREFQc0xsV082NWNGdnIvcFRPb3hNSGd0ZEZPNGNiWjFnSlFjY0dqZGVRUUNiUlJpcWdHYmRpV2xWTmc1QXE3K0pCOFgrVGlFVEtpNwp0QjRET3grSE5wSjhzcHpUY01nRHo3bTJMVkN0Y0lOYkhRODFZOVRsVTRzanB5Q251M3hNWUFuYzlramRwZlVZR0RFTi9LYktKenMrCkFNNG5hU3NDb0FqSUdpSWZrMzRJS3RPMHJWdndKbnkvV3o3R2NnbHVWNU5zMVFqbG04djV6YlEzN3hvbVg0Q3I3ZXF2Vzd3UEhsam8KbWJvdkRGYld2YWFwUWhKemU5aStWejZKYlJNOGV0aHpCbHBUNEtVQ0tCMVg1elZrUGt3NUJVYUhaK3FPREFXYndtdUFsRkZnZmxVbQpTYk1ZT05oWFlhVFpCSGVxSEZkekZlWnlHSGdhbGl5Q056dkFnaytoOTN3d3hudXVadTlMVU5KSlh2dkI1NkJaM0kxYjFSbTZ0a3JRCnZJZDhvZklXY0hHRlp3MjBOWVV2Z1M5TlFFdmdJYy9XQTdnMENzcTdRM09abU9iK1lMME1aYjh1cWRPSm1EZURKVXUrME9YeFVQbTkKNXdVQllFZjBMRjdBNVNDNC9LQjhqS1VDTEovZXVLU09nWmJwWVBhWFQxTDliNmdwOW80b2I2Sm1CRlFyakh1YXI0QzUxbTFXblZQWQo4QTVpRnJ3TURIUEJjRUZ2dWRyRDBBNk1xY0M5TWtIL0FFT3RHLzA2QnRyT2d6MENrRG1OL1U2QTVhTGVjcldISlJuOHpzbkgyRzhICld6N3c2L2Q2ZFF5OCtpSlVLWnpDdmtsZzdhTzNYTzFoL1FCOEZhWUJWd1VJajY2anpqV3dLaG5LRkdZNk5Zc0EvOS9oWjZmK1FVS2IKSE1xbUNZOGFoRGtiVXJJVnBtdlV3T2dTdmVWcWo5RWxRcHZzalhTMjhPZzY2aHlCdG5ESVUzak9OSm1nUzFlOTVXcVBMbDJGTmpuawpwUW1QcnFPZU9TQ25WYnpYamZwUWRPbTJlNVZqYndhWVV5SEtxaHlueGh1R05JT3FLUGxET1dNVWhIcHFGcE1PQ00wUW11UTBWMFVKCmIycWpudUdzOU81UW9EQ2MxYTQvUlB2cUxWczdSUHNLVFhJb21BN3BQZXN1cmNmQS9EYVE5cTU4TXZOTUdMRUxUSW5jOURBbENpM20KbWZKeGFWY2dQMEpWU3BnelVubHNMTGNNdXA3VVc3Nzc2SHBTYUZIU083ZWJFMG52M0FyRm1jcEpGeitodDN6M3NmZ0paWjBYL1NHNgpyUk5KbTJUQVoyK3BtUGJRSFRvTjFOc0MxOUZwb05DZ3BQT3pyZEJFeFh2eVdwZ3lBQnlqbFpNdkhRekdGNTFNM2doZ2ZGRndWOUxuCkdDMjhjQnFoWDhPcEJjb0ZMcndEOXlqOTU2QVI0cDQ4d1YxSjM2a0Z3Z3VYc0ZERnhWV1NZRThPQkhiVTJ4TDFDT3dvT0t2UnRyRE0KalVLZFkrRk1rb3BDZldINWMyQytDWWE1ekJjRlY2bXZzcTR6U2NJRHQvRENkK0RZcjF5c2NoaE1Dd1NERTE5UGVodUdRc0d4Y3BpSwphOTkrb2QxdEJKbmcyMWgxaDN2eHV4QWJDYWlZVytOMXhBaHV4ZStxMC9KdHJOQ3VDUjY5RThxMnFTdGNjRC9FcmdMakVQZnJhZ1hqCkVNR3A0SDUxR3NxMkNjMmF3WndJcjR4VlYxeVNvTGdVcGgwRHl3eTlyUVBMTkpoMlJIQlN5LytWc1VLenBnZ3VnSDFCNmtsVUxvU2sKMVJENHF0dWxYVWJnS0VnYUFaWHg2bm52Q3hKYVBZSzd3aURUQ1RLT2wySHZYMkhRVmpCNThmc1IwMDh3NkVGSXJRVEhYUFY4TStPRgpSby9pc1crZ0tGRTlLVW1DNGdSWXZnODZGNEloem4wT0RjRVFCNTN6WWZseUtCN25ITWVpUktITjR6RHNnR2VPUXFrVEgrOUpFa2pkCklUTVpscXlIeUVmQlI4TkpRajRPa1hQSmVzajhBS1J1em5FckxSZWFERTcrTU1ObG1IYkQ5RStnOUppVEprb2d4VUwrUW5pdkpZekwKaGc0UGdhOExrNVY4bDR0dHgyV0xYUGtMUlc1bitaUWVFMXBNdTUzbjRKNkoyK0daWGxBVTQ0S0p2elRiWU1nNUFEczN3T0pxZUR3RgpCclNFcmlFUVhnM0JrMFFMcnhiTEJyUVVNWXVyeFRZNUIwUU9WK3NYeFFnTnB1MWVOdThhRE9kaDFDekk3T202aUZxZHp0MVFhWVdmClV5QjNLSnpwSmxydVVMR3MwaXBpdEtpVjJWTndONXpYeWJ3YkVUME12dW9Maml4dHhIbXlPYklFMStqRzl1dTlvS0d3SWdyS1hQZ1YKaXJkYVdTdkJNV2lvM200MUFQTmlHSjROQi9hRFBWcC93NjQxZTdUZ05EeGJjR3owYUowTWNhRncyZ2lPb3pxZXJrY0ZoN2hRd2VubQp3blpvWHd6eFMrRmttUGdMdWJlTXE5a3Fhc1l2RlJ6UXE1ZlZCQnVnN1ZSNHFoQjJUSVlMSlNBNStWTWNWYTBIRkJsaHgxOUVyYlpUClJlM2ZGZndLb0VjbHpBeUQ1R053Mmc0Vjk0RkR4YnVKMzV5ZVc2QWlCczUwZ1E5Ync4d1owRE1FL0x3Nm9LdmhSM3ZPd2pJYmdwK0gKaUZ6b2RnRWlwMEw3dFJBOERwclBneWIrWUxhTFdKc0pMcGRBNmI4Z2Z3OWtUWWUwamZCREN6alZDczdGUWZVOFBWVDhEOVJKb1V5aAphaS9wQUFBQUpYUkZXSFJrWVhSbE9tTnlaV0YwWlFBeU1ERTVMVEEwTFRJMVZESXdPalUxT2pVekxUQTNPakF3MTRreHlnQUFBQ1YwClJWaDBaR0YwWlRwdGIyUnBabmtBTWpBeE9TMHdOQzB5TlZReU1EbzFOVG8xTXkwd056b3dNS2JVaVhZQUFBQVpkRVZZZEZOdlpuUjMKWVhKbEFIZDNkeTVwYm10elkyRndaUzV2Y21lYjdqd2FBQUFBQUVsRlRrU3VRbUNDIiAvPgo8L3N2Zz4K';

class waniBoard {
    constructor(runtime) {
        this.runtime = runtime
        this.audioEngine = runtime.audioEngine
        this.oscillator =  null
        this._lastUpdate = null
        this.video = new VideoMotion();
        if (this.runtime.ioDevices) {
            console.log(this.runtime.ioDevices)
            this.runtime.ioDevices.video.enableVideo();
            this.runtime.ioDevices.video.setPreviewGhost(89);
            this._loop();
        }
    }

    _loop () {
        const time = Date.now();
        if (this._lastUpdate === null) {
            this._lastUpdate = time;
        }
        const offset = time - this._lastUpdate;
        if (offset > 30) {
            const frame = this.runtime.ioDevices.video.getFrame({
                format: 'image-data',
                dimensions: [480, 360]
            });
            if (frame) {
                this._lastUpdate = time;
                this.video.addFrame(frame.data);
            }
        }
        setTimeout(this._loop.bind(this), Math.max(this.runtime.currentStepTime, 30));
    }

    getInfo() {
        return {
            id: 'waniBoard',
            name: formatMessage({
                id: 'tfabworks.categoryName',
                default: 'Electrical',
                description: 'Label for the Science extension category'
            }),
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'whenBrightLessThan',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'tfabworks.brightness',
                        default: 'When brightness less than',
                        description: 'brightness'
                    })
                },
                {
                    opcode: 'whenMotionGreaterThan',
                    text: formatMessage({
                        id: 'tfabworks.motion',
                        default: 'When motion detected',
                        description: 'motion'
                    }),
                    blockType: BlockType.BOOLEAN,
                },
                {
                    opcode: 'switchOn',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'waniBoard.switchOn',
                        default: 'Switch ON',
                        description: 'Switch On'
                    })
                },
                {
                    opcode: 'switchOff',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'waniBoard.switchOff',
                        default: 'Switch OFF',
                        description: 'Switch Off'
                    })
                }
            ],
            arguments: {},
        }
    }
    
    whenBrightLessThan(arg, util) {
        return this.video.getBrightness() < 30
    }

    whenMotionGreaterThan(arg, util) {
        this.video.analyzeFrame();
        const state = this._analyzeLocalMotion(util.target);
        return state.motionAmount > 10;
    }

    _analyzeLocalMotion (target) {
        const drawable = this.runtime.renderer._allDrawables[target.drawableID];
        const state = this._getMotionState(target);
        this.video.getLocalMotion(drawable, state);
        return state;
    }

    _getMotionState (target) {
        let motionState = target.getCustomState(waniBoard.STATE_KEY);
        if (!motionState) {
            motionState = Clone.simple({
                motionFrameNumber: 0,
                motionAmount: 0,
                motionDirection: 0
            });
            target.setCustomState(waniBoard.STATE_KEY, motionState);
        }
        return motionState;
    }

    switchOn(args, util) {
        console.log('switch on')
        if (util.runtime.audioEngine === null) return;
        if (util.target.sprite.soundBank === null) return;
        if (this.oscillator !== null) return;
        this.oscillator =  this.audioEngine.audioContext.createOscillator()
        this.oscillator.frequency.value = 17000
        this.oscillator.connect(this.audioEngine.getInputNode())

        this.oscillator.start()
    }

    switchOff() {
        console.log('switch off')
        if (this.oscillator !== null) {
            this.oscillator.stop()
            this.oscillator.disconnect()
            this.oscillator = null
        }
    }

    static get STATE_KEY() {
        return 'tfabworks.waniBoard'
    }
}

module.exports = waniBoard
