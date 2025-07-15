export declare const DYNAMIC_BONDING_CURVE_IDL: {
    address: string;
    metadata: {
        name: string;
        version: string;
        spec: string;
        description: string;
    };
    instructions: ({
        name: string;
        discriminator: number[];
        accounts: ({
            name: string;
            address: string;
            relations?: undefined;
            writable?: undefined;
            docs?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            relations: string[];
            address?: undefined;
            writable?: undefined;
            docs?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable: boolean;
            address?: undefined;
            relations?: undefined;
            docs?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            relations: string[];
            address?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            docs: string[];
            relations: string[];
            address?: undefined;
            writable?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            pda: {
                seeds: ({
                    kind: string;
                    value: number[];
                    path?: undefined;
                } | {
                    kind: string;
                    path: string;
                    value?: undefined;
                })[];
                program: {
                    kind: string;
                    value: number[];
                };
            };
            address?: undefined;
            relations?: undefined;
            signer?: undefined;
        } | {
            name: string;
            docs: string[];
            address?: undefined;
            relations?: undefined;
            writable?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            docs: string[];
            signer: boolean;
            relations: string[];
            address?: undefined;
            writable?: undefined;
            pda?: undefined;
        } | {
            name: string;
            pda: {
                seeds: {
                    kind: string;
                    value: number[];
                }[];
                program?: undefined;
            };
            address?: undefined;
            relations?: undefined;
            writable?: undefined;
            docs?: undefined;
            signer?: undefined;
        } | {
            name: string;
            address?: undefined;
            relations?: undefined;
            writable?: undefined;
            docs?: undefined;
            pda?: undefined;
            signer?: undefined;
        })[];
        args: never[];
        docs?: undefined;
    } | {
        name: string;
        discriminator: number[];
        accounts: ({
            name: string;
            address: string;
            relations?: undefined;
            writable?: undefined;
            docs?: undefined;
            signer?: undefined;
            pda?: undefined;
        } | {
            name: string;
            relations: string[];
            address?: undefined;
            writable?: undefined;
            docs?: undefined;
            signer?: undefined;
            pda?: undefined;
        } | {
            name: string;
            writable: boolean;
            address?: undefined;
            relations?: undefined;
            docs?: undefined;
            signer?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            address?: undefined;
            relations?: undefined;
            signer?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            relations: string[];
            address?: undefined;
            signer?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            relations: string[];
            address?: undefined;
            writable?: undefined;
            signer?: undefined;
            pda?: undefined;
        } | {
            name: string;
            signer: boolean;
            relations: string[];
            address?: undefined;
            writable?: undefined;
            docs?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            address?: undefined;
            relations?: undefined;
            writable?: undefined;
            signer?: undefined;
            pda?: undefined;
        } | {
            name: string;
            pda: {
                seeds: {
                    kind: string;
                    value: number[];
                }[];
            };
            address?: undefined;
            relations?: undefined;
            writable?: undefined;
            docs?: undefined;
            signer?: undefined;
        } | {
            name: string;
            address?: undefined;
            relations?: undefined;
            writable?: undefined;
            docs?: undefined;
            signer?: undefined;
            pda?: undefined;
        })[];
        args: {
            name: string;
            type: string;
        }[];
        docs?: undefined;
    } | {
        name: string;
        discriminator: number[];
        accounts: ({
            name: string;
            writable: boolean;
            signer?: undefined;
            pda?: undefined;
        } | {
            name: string;
            signer: boolean;
            writable?: undefined;
            pda?: undefined;
        } | {
            name: string;
            pda: {
                seeds: {
                    kind: string;
                    value: number[];
                }[];
            };
            writable?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable?: undefined;
            signer?: undefined;
            pda?: undefined;
        })[];
        args: never[];
        docs?: undefined;
    } | {
        name: string;
        discriminator: number[];
        accounts: ({
            name: string;
            writable: boolean;
            signer: boolean;
            docs?: undefined;
            address?: undefined;
            pda?: undefined;
        } | {
            name: string;
            writable?: undefined;
            signer?: undefined;
            docs?: undefined;
            address?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            writable?: undefined;
            signer?: undefined;
            address?: undefined;
            pda?: undefined;
        } | {
            name: string;
            address: string;
            writable?: undefined;
            signer?: undefined;
            docs?: undefined;
            pda?: undefined;
        } | {
            name: string;
            pda: {
                seeds: {
                    kind: string;
                    value: number[];
                }[];
            };
            writable?: undefined;
            signer?: undefined;
            docs?: undefined;
            address?: undefined;
        })[];
        args: {
            name: string;
            type: {
                defined: {
                    name: string;
                };
            };
        }[];
        docs?: undefined;
    } | {
        name: string;
        docs: string[];
        discriminator: number[];
        accounts: ({
            name: string;
            docs: string[];
            writable: boolean;
            relations?: undefined;
            address?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            docs: string[];
            relations: string[];
            writable?: undefined;
            address?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable: boolean;
            address: string;
            docs?: undefined;
            relations?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable: boolean;
            relations: string[];
            docs?: undefined;
            address?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable: boolean;
            pda: {
                seeds: ({
                    kind: string;
                    value: number[];
                    path?: undefined;
                } | {
                    kind: string;
                    path: string;
                    value?: undefined;
                })[];
            };
            docs?: undefined;
            relations?: undefined;
            address?: undefined;
            signer?: undefined;
        } | {
            name: string;
            relations: string[];
            docs?: undefined;
            writable?: undefined;
            address?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable: boolean;
            docs?: undefined;
            relations?: undefined;
            address?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable: boolean;
            signer: boolean;
            docs?: undefined;
            relations?: undefined;
            address?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs?: undefined;
            writable?: undefined;
            relations?: undefined;
            address?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            address: string;
            docs?: undefined;
            writable?: undefined;
            relations?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            docs: string[];
            address: string;
            writable?: undefined;
            relations?: undefined;
            pda?: undefined;
            signer?: undefined;
        })[];
        args: never[];
    } | {
        name: string;
        docs: string[];
        discriminator: number[];
        accounts: ({
            name: string;
            docs: string[];
            writable: boolean;
            pda: {
                seeds: ({
                    kind: string;
                    value: number[];
                    path?: undefined;
                } | {
                    kind: string;
                    path: string;
                    value?: undefined;
                })[];
            };
            signer?: undefined;
            address?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            signer: boolean;
            pda?: undefined;
            address?: undefined;
        } | {
            name: string;
            docs: string[];
            signer: boolean;
            writable?: undefined;
            pda?: undefined;
            address?: undefined;
        } | {
            name: string;
            docs: string[];
            address: string;
            writable?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            pda: {
                seeds: {
                    kind: string;
                    value: number[];
                }[];
            };
            docs?: undefined;
            writable?: undefined;
            signer?: undefined;
            address?: undefined;
        } | {
            name: string;
            docs?: undefined;
            writable?: undefined;
            pda?: undefined;
            signer?: undefined;
            address?: undefined;
        })[];
        args: {
            name: string;
            type: {
                defined: {
                    name: string;
                };
            };
        }[];
    } | {
        name: string;
        discriminator: number[];
        accounts: ({
            name: string;
            writable: boolean;
            docs?: undefined;
            pda?: undefined;
            signer?: undefined;
            relations?: undefined;
            address?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            pda: {
                seeds: ({
                    kind: string;
                    value: number[];
                    path?: undefined;
                } | {
                    kind: string;
                    path: string;
                    value?: undefined;
                })[];
            };
            signer?: undefined;
            relations?: undefined;
            address?: undefined;
        } | {
            name: string;
            signer: boolean;
            relations: string[];
            writable?: undefined;
            docs?: undefined;
            pda?: undefined;
            address?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            signer: boolean;
            pda?: undefined;
            relations?: undefined;
            address?: undefined;
        } | {
            name: string;
            docs: string[];
            address: string;
            writable?: undefined;
            pda?: undefined;
            signer?: undefined;
            relations?: undefined;
        } | {
            name: string;
            pda: {
                seeds: {
                    kind: string;
                    value: number[];
                }[];
            };
            writable?: undefined;
            docs?: undefined;
            signer?: undefined;
            relations?: undefined;
            address?: undefined;
        } | {
            name: string;
            writable?: undefined;
            docs?: undefined;
            pda?: undefined;
            signer?: undefined;
            relations?: undefined;
            address?: undefined;
        })[];
        args: {
            name: string;
            type: {
                defined: {
                    name: string;
                };
            };
        }[];
        docs?: undefined;
    } | {
        name: string;
        docs: string[];
        discriminator: number[];
        accounts: ({
            name: string;
            docs: string[];
            address?: undefined;
            signer?: undefined;
            writable?: undefined;
            relations?: undefined;
            pda?: undefined;
        } | {
            name: string;
            address: string;
            docs?: undefined;
            signer?: undefined;
            writable?: undefined;
            relations?: undefined;
            pda?: undefined;
        } | {
            name: string;
            signer: boolean;
            docs?: undefined;
            address?: undefined;
            writable?: undefined;
            relations?: undefined;
            pda?: undefined;
        } | {
            name: string;
            writable: boolean;
            signer: boolean;
            docs?: undefined;
            address?: undefined;
            relations?: undefined;
            pda?: undefined;
        } | {
            name: string;
            relations: string[];
            docs?: undefined;
            address?: undefined;
            signer?: undefined;
            writable?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            address?: undefined;
            signer?: undefined;
            relations?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            pda: {
                seeds: ({
                    kind: string;
                    value: number[];
                    path?: undefined;
                } | {
                    kind: string;
                    path: string;
                    value?: undefined;
                })[];
            };
            address?: undefined;
            signer?: undefined;
            relations?: undefined;
        } | {
            name: string;
            writable: boolean;
            docs?: undefined;
            address?: undefined;
            signer?: undefined;
            relations?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            signer: boolean;
            address?: undefined;
            relations?: undefined;
            pda?: undefined;
        } | {
            name: string;
            pda: {
                seeds: {
                    kind: string;
                    value: number[];
                }[];
            };
            docs?: undefined;
            address?: undefined;
            signer?: undefined;
            writable?: undefined;
            relations?: undefined;
        } | {
            name: string;
            docs?: undefined;
            address?: undefined;
            signer?: undefined;
            writable?: undefined;
            relations?: undefined;
            pda?: undefined;
        })[];
        args: {
            name: string;
            type: {
                defined: {
                    name: string;
                };
            };
        }[];
    } | {
        name: string;
        discriminator: number[];
        accounts: ({
            name: string;
            docs: string[];
            address?: undefined;
            signer?: undefined;
            writable?: undefined;
            relations?: undefined;
            pda?: undefined;
        } | {
            name: string;
            address: string;
            docs?: undefined;
            signer?: undefined;
            writable?: undefined;
            relations?: undefined;
            pda?: undefined;
        } | {
            name: string;
            signer: boolean;
            docs?: undefined;
            address?: undefined;
            writable?: undefined;
            relations?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            signer: boolean;
            address?: undefined;
            relations?: undefined;
            pda?: undefined;
        } | {
            name: string;
            relations: string[];
            docs?: undefined;
            address?: undefined;
            signer?: undefined;
            writable?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            address?: undefined;
            signer?: undefined;
            relations?: undefined;
            pda?: undefined;
        } | {
            name: string;
            writable: boolean;
            pda: {
                seeds: ({
                    kind: string;
                    value: number[];
                    path?: undefined;
                } | {
                    kind: string;
                    path: string;
                    value?: undefined;
                })[];
            };
            docs?: undefined;
            address?: undefined;
            signer?: undefined;
            relations?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            pda: {
                seeds: ({
                    kind: string;
                    value: number[];
                    path?: undefined;
                } | {
                    kind: string;
                    path: string;
                    value?: undefined;
                })[];
            };
            address?: undefined;
            signer?: undefined;
            relations?: undefined;
        } | {
            name: string;
            docs: string[];
            address: string;
            signer?: undefined;
            writable?: undefined;
            relations?: undefined;
            pda?: undefined;
        } | {
            name: string;
            pda: {
                seeds: {
                    kind: string;
                    value: number[];
                }[];
            };
            docs?: undefined;
            address?: undefined;
            signer?: undefined;
            writable?: undefined;
            relations?: undefined;
        } | {
            name: string;
            docs?: undefined;
            address?: undefined;
            signer?: undefined;
            writable?: undefined;
            relations?: undefined;
            pda?: undefined;
        })[];
        args: {
            name: string;
            type: {
                defined: {
                    name: string;
                };
            };
        }[];
        docs?: undefined;
    } | {
        name: string;
        discriminator: number[];
        accounts: ({
            name: string;
            docs: string[];
            writable: boolean;
            relations: string[];
            address?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable: boolean;
            docs?: undefined;
            relations?: undefined;
            address?: undefined;
            signer?: undefined;
        } | {
            name: string;
            relations: string[];
            docs?: undefined;
            writable?: undefined;
            address?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable: boolean;
            address: string;
            docs?: undefined;
            relations?: undefined;
            signer?: undefined;
        } | {
            name: string;
            docs: string[];
            writable?: undefined;
            relations?: undefined;
            address?: undefined;
            signer?: undefined;
        } | {
            name: string;
            docs?: undefined;
            writable?: undefined;
            relations?: undefined;
            address?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable: boolean;
            relations: string[];
            docs?: undefined;
            address?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable: boolean;
            signer: boolean;
            docs?: undefined;
            relations?: undefined;
            address?: undefined;
        } | {
            name: string;
            address: string;
            docs?: undefined;
            writable?: undefined;
            relations?: undefined;
            signer?: undefined;
        } | {
            name: string;
            docs: string[];
            address: string;
            writable?: undefined;
            relations?: undefined;
            signer?: undefined;
        })[];
        args: never[];
        docs?: undefined;
    } | {
        name: string;
        discriminator: number[];
        accounts: ({
            name: string;
            relations: string[];
            docs?: undefined;
            writable?: undefined;
            address?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            relations?: undefined;
            address?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable: boolean;
            address: string;
            relations?: undefined;
            docs?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable: boolean;
            pda: {
                seeds: ({
                    kind: string;
                    path: string;
                    value?: undefined;
                } | {
                    kind: string;
                    value: number[];
                    path?: undefined;
                })[];
                program: {
                    kind: string;
                    value: number[];
                };
            };
            relations?: undefined;
            docs?: undefined;
            address?: undefined;
            signer?: undefined;
        } | {
            name: string;
            relations?: undefined;
            docs?: undefined;
            writable?: undefined;
            address?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            signer: boolean;
            relations?: undefined;
            docs?: undefined;
            writable?: undefined;
            address?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            address: string;
            relations?: undefined;
            writable?: undefined;
            pda?: undefined;
            signer?: undefined;
        })[];
        args: never[];
        docs?: undefined;
    } | {
        name: string;
        discriminator: number[];
        accounts: ({
            name: string;
            relations: string[];
            docs?: undefined;
            writable?: undefined;
            address?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            relations?: undefined;
            address?: undefined;
            pda?: undefined;
        } | {
            name: string;
            writable: boolean;
            address: string;
            relations?: undefined;
            docs?: undefined;
            pda?: undefined;
        } | {
            name: string;
            writable: boolean;
            relations: string[];
            docs?: undefined;
            address?: undefined;
            pda?: undefined;
        } | {
            name: string;
            writable: boolean;
            relations?: undefined;
            docs?: undefined;
            address?: undefined;
            pda?: undefined;
        } | {
            name: string;
            writable: boolean;
            pda: {
                seeds: ({
                    kind: string;
                    path: string;
                    value?: undefined;
                } | {
                    kind: string;
                    value: number[];
                    path?: undefined;
                })[];
                program: {
                    kind: string;
                    value: number[];
                };
            };
            relations?: undefined;
            docs?: undefined;
            address?: undefined;
        } | {
            name: string;
            address: string;
            relations?: undefined;
            docs?: undefined;
            writable?: undefined;
            pda?: undefined;
        } | {
            name: string;
            relations?: undefined;
            docs?: undefined;
            writable?: undefined;
            address?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            address: string;
            relations?: undefined;
            writable?: undefined;
            pda?: undefined;
        })[];
        args: never[];
        docs?: undefined;
    } | {
        name: string;
        discriminator: number[];
        accounts: ({
            name: string;
            docs: string[];
            writable: boolean;
            relations: string[];
            address?: undefined;
            optional?: undefined;
            signer?: undefined;
        } | {
            name: string;
            docs: string[];
            writable?: undefined;
            relations?: undefined;
            address?: undefined;
            optional?: undefined;
            signer?: undefined;
        } | {
            name: string;
            docs: string[];
            relations: string[];
            writable?: undefined;
            address?: undefined;
            optional?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable: boolean;
            address: string;
            docs?: undefined;
            relations?: undefined;
            optional?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable: boolean;
            docs?: undefined;
            relations?: undefined;
            address?: undefined;
            optional?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable: boolean;
            optional: boolean;
            docs?: undefined;
            relations?: undefined;
            address?: undefined;
            signer?: undefined;
        } | {
            name: string;
            docs?: undefined;
            writable?: undefined;
            relations?: undefined;
            address?: undefined;
            optional?: undefined;
            signer?: undefined;
        } | {
            name: string;
            address: string;
            docs?: undefined;
            writable?: undefined;
            relations?: undefined;
            optional?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable: boolean;
            relations: string[];
            docs?: undefined;
            address?: undefined;
            optional?: undefined;
            signer?: undefined;
        } | {
            name: string;
            writable: boolean;
            signer: boolean;
            docs?: undefined;
            relations?: undefined;
            address?: undefined;
            optional?: undefined;
        } | {
            name: string;
            docs: string[];
            address: string;
            writable?: undefined;
            relations?: undefined;
            optional?: undefined;
            signer?: undefined;
        })[];
        args: never[];
        docs?: undefined;
    } | {
        name: string;
        discriminator: number[];
        accounts: ({
            name: string;
            relations?: undefined;
            writable?: undefined;
            pda?: undefined;
            signer?: undefined;
            address?: undefined;
        } | {
            name: string;
            relations: string[];
            writable?: undefined;
            pda?: undefined;
            signer?: undefined;
            address?: undefined;
        } | {
            name: string;
            writable: boolean;
            pda: {
                seeds: ({
                    kind: string;
                    value: number[];
                    path?: undefined;
                } | {
                    kind: string;
                    path: string;
                    value?: undefined;
                })[];
            };
            relations?: undefined;
            signer?: undefined;
            address?: undefined;
        } | {
            name: string;
            writable: boolean;
            signer: boolean;
            relations?: undefined;
            pda?: undefined;
            address?: undefined;
        } | {
            name: string;
            address: string;
            relations?: undefined;
            writable?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            pda: {
                seeds: {
                    kind: string;
                    value: number[];
                }[];
            };
            relations?: undefined;
            writable?: undefined;
            signer?: undefined;
            address?: undefined;
        })[];
        args: never[];
        docs?: undefined;
    } | {
        name: string;
        docs: string[];
        discriminator: number[];
        accounts: ({
            name: string;
            relations?: undefined;
            writable?: undefined;
            pda?: undefined;
            signer?: undefined;
            address?: undefined;
        } | {
            name: string;
            relations: string[];
            writable?: undefined;
            pda?: undefined;
            signer?: undefined;
            address?: undefined;
        } | {
            name: string;
            writable: boolean;
            pda: {
                seeds: ({
                    kind: string;
                    value: number[];
                    path?: undefined;
                } | {
                    kind: string;
                    path: string;
                    value?: undefined;
                })[];
            };
            relations?: undefined;
            signer?: undefined;
            address?: undefined;
        } | {
            name: string;
            writable: boolean;
            signer: boolean;
            relations?: undefined;
            pda?: undefined;
            address?: undefined;
        } | {
            name: string;
            address: string;
            relations?: undefined;
            writable?: undefined;
            pda?: undefined;
            signer?: undefined;
        } | {
            name: string;
            pda: {
                seeds: {
                    kind: string;
                    value: number[];
                }[];
            };
            relations?: undefined;
            writable?: undefined;
            signer?: undefined;
            address?: undefined;
        })[];
        args: never[];
    } | {
        name: string;
        docs: string[];
        discriminator: number[];
        accounts: ({
            name: string;
            address: string;
            docs?: undefined;
            relations?: undefined;
            writable?: undefined;
            signer?: undefined;
            optional?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            relations: string[];
            address?: undefined;
            writable?: undefined;
            signer?: undefined;
            optional?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            address?: undefined;
            relations?: undefined;
            signer?: undefined;
            optional?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            relations: string[];
            address?: undefined;
            signer?: undefined;
            optional?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            address?: undefined;
            relations?: undefined;
            writable?: undefined;
            signer?: undefined;
            optional?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            signer: boolean;
            address?: undefined;
            relations?: undefined;
            writable?: undefined;
            optional?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            optional: boolean;
            address?: undefined;
            relations?: undefined;
            signer?: undefined;
            pda?: undefined;
        } | {
            name: string;
            pda: {
                seeds: {
                    kind: string;
                    value: number[];
                }[];
            };
            address?: undefined;
            docs?: undefined;
            relations?: undefined;
            writable?: undefined;
            signer?: undefined;
            optional?: undefined;
        } | {
            name: string;
            address?: undefined;
            docs?: undefined;
            relations?: undefined;
            writable?: undefined;
            signer?: undefined;
            optional?: undefined;
            pda?: undefined;
        })[];
        args: {
            name: string;
            type: {
                defined: {
                    name: string;
                };
            };
        }[];
    } | {
        name: string;
        docs: string[];
        discriminator: number[];
        accounts: ({
            name: string;
            address: string;
            relations?: undefined;
            writable?: undefined;
            docs?: undefined;
            signer?: undefined;
            pda?: undefined;
        } | {
            name: string;
            relations: string[];
            address?: undefined;
            writable?: undefined;
            docs?: undefined;
            signer?: undefined;
            pda?: undefined;
        } | {
            name: string;
            writable: boolean;
            address?: undefined;
            relations?: undefined;
            docs?: undefined;
            signer?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            address?: undefined;
            relations?: undefined;
            signer?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            writable: boolean;
            relations: string[];
            address?: undefined;
            signer?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            relations: string[];
            address?: undefined;
            writable?: undefined;
            signer?: undefined;
            pda?: undefined;
        } | {
            name: string;
            signer: boolean;
            address?: undefined;
            relations?: undefined;
            writable?: undefined;
            docs?: undefined;
            pda?: undefined;
        } | {
            name: string;
            docs: string[];
            address?: undefined;
            relations?: undefined;
            writable?: undefined;
            signer?: undefined;
            pda?: undefined;
        } | {
            name: string;
            pda: {
                seeds: {
                    kind: string;
                    value: number[];
                }[];
            };
            address?: undefined;
            relations?: undefined;
            writable?: undefined;
            docs?: undefined;
            signer?: undefined;
        } | {
            name: string;
            address?: undefined;
            relations?: undefined;
            writable?: undefined;
            docs?: undefined;
            signer?: undefined;
            pda?: undefined;
        })[];
        args: {
            name: string;
            type: string;
        }[];
    })[];
    accounts: {
        name: string;
        discriminator: number[];
    }[];
    events: {
        name: string;
        discriminator: number[];
    }[];
    errors: {
        code: number;
        name: string;
        msg: string;
    }[];
    types: ({
        name: string;
        docs: string[];
        serialization: string;
        repr: {
            kind: string;
        };
        type: {
            kind: string;
            fields: ({
                name: string;
                docs: string[];
                type: string;
            } | {
                name: string;
                docs: string[];
                type: {
                    array: (string | number)[];
                };
            })[];
        };
    } | {
        name: string;
        type: {
            kind: string;
            fields: ({
                name: string;
                type: {
                    defined: {
                        name: string;
                    };
                    option?: undefined;
                    array?: undefined;
                    vec?: undefined;
                };
                docs?: undefined;
            } | {
                name: string;
                type: string;
                docs?: undefined;
            } | {
                name: string;
                type: {
                    option: {
                        defined: {
                            name: string;
                        };
                    };
                    defined?: undefined;
                    array?: undefined;
                    vec?: undefined;
                };
                docs?: undefined;
            } | {
                name: string;
                type: {
                    array: (string | number)[];
                    defined?: undefined;
                    option?: undefined;
                    vec?: undefined;
                };
                docs?: undefined;
            } | {
                name: string;
                docs: string[];
                type: {
                    array: (string | number)[];
                    defined?: undefined;
                    option?: undefined;
                    vec?: undefined;
                };
            } | {
                name: string;
                type: {
                    vec: {
                        defined: {
                            name: string;
                        };
                    };
                    defined?: undefined;
                    option?: undefined;
                    array?: undefined;
                };
                docs?: undefined;
            })[];
        };
        docs?: undefined;
        serialization?: undefined;
        repr?: undefined;
    } | {
        name: string;
        docs: string[];
        type: {
            kind: string;
            fields: ({
                name: string;
                type: string;
            } | {
                name: string;
                type: {
                    defined: {
                        name: string;
                    };
                    vec?: undefined;
                };
            } | {
                name: string;
                type: {
                    vec: {
                        defined: {
                            name: string;
                        };
                    };
                    defined?: undefined;
                };
            })[];
        };
        serialization?: undefined;
        repr?: undefined;
    } | {
        name: string;
        docs: string[];
        type: {
            kind: string;
            fields: ({
                name: string;
                docs: string[];
                type: string;
            } | {
                name: string;
                docs: string[];
                type: {
                    array: (string | number)[];
                };
            })[];
        };
        serialization?: undefined;
        repr?: undefined;
    } | {
        name: string;
        serialization: string;
        repr: {
            kind: string;
        };
        type: {
            kind: string;
            fields: ({
                name: string;
                docs: string[];
                type: string;
            } | {
                name: string;
                docs: string[];
                type: {
                    defined: {
                        name: string;
                    };
                    array?: undefined;
                };
            } | {
                name: string;
                docs: string[];
                type: {
                    array: (string | number)[];
                    defined?: undefined;
                };
            } | {
                name: string;
                docs: string[];
                type: {
                    array: (number | {
                        defined: {
                            name: string;
                        };
                    })[];
                    defined?: undefined;
                };
            })[];
        };
        docs?: undefined;
    } | {
        name: string;
        docs: string[];
        type: {
            kind: string;
            fields: ({
                name: string;
                docs: string[];
                type: {
                    defined: {
                        name: string;
                    };
                    option?: undefined;
                };
            } | {
                name: string;
                docs: string[];
                type: {
                    option: {
                        defined: {
                            name: string;
                        };
                    };
                    defined?: undefined;
                };
            })[];
        };
        serialization?: undefined;
        repr?: undefined;
    } | {
        name: string;
        serialization: string;
        repr: {
            kind: string;
        };
        type: {
            kind: string;
            fields: ({
                name: string;
                type: {
                    defined: {
                        name: string;
                    };
                    array?: undefined;
                };
            } | {
                name: string;
                type: {
                    array: (string | number)[];
                    defined?: undefined;
                };
            } | {
                name: string;
                type: string;
            })[];
        };
        docs?: undefined;
    } | {
        name: string;
        type: {
            kind: string;
            fields: {
                name: string;
                docs: string[];
                type: string;
            }[];
        };
        docs?: undefined;
        serialization?: undefined;
        repr?: undefined;
    })[];
};
export declare const SWAP_EVENT_DISCRIMINATOR: Buffer<ArrayBuffer>;
